import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface SquareProps {
    numbers: number[][];
}

export function Square({ numbers }: SquareProps) {
    console.log(numbers)
    const [lines, setLines] = useState<{ x1: number, y1: number, x2: number, y2: number }[]>([]);
    const [currentLine, setCurrentLine] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);
    const boxLayoutRef = useRef<{ x: number, y: number, width: number, height: number } | null>(null);
    const pointsRef = useRef<{ x: number, y: number }[][]>(Array.from({ length: 3 }, () => Array(3).fill(null)));
    const activePoints = useRef<{ x: number, y: number }[]>([]);
    const [currentCoordinates, setCurrentCoordinates] = useState<{ x: number, y: number } | null>();
    const boxRef = useRef<View>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { pageX, pageY } = evt.nativeEvent;
                const boxLayout = boxLayoutRef.current;
                if (boxLayout) {
                    const adjustedX = pageX - boxLayout.x;
                    const adjustedY = pageY - boxLayout.y;
                    setCurrentCoordinates({ x: adjustedX, y: adjustedY });
                    const startPoint = findClosestPoint(adjustedX, adjustedY);
                    if (startPoint) {
                        activePoints.current.push(startPoint);
                    }
                }
            },
            onPanResponderMove: (evt) => {
                const { pageX, pageY } = evt.nativeEvent;
                const boxLayout = boxLayoutRef.current;
                if (boxLayout) {
                    const adjustedX = pageX - boxLayout.x;
                    const adjustedY = pageY - boxLayout.y;
                    setCurrentCoordinates({ x: adjustedX, y: adjustedY });
                    const endPoint = findClosestPoint(adjustedX, adjustedY);
                    if (activePoints.current.length == 0) {
                        if (endPoint) {
                            activePoints.current.push(endPoint);
                        }
                    } else {
                        const startPoint = activePoints.current[activePoints.current.length - 1];
                        if (endPoint) {
                            if (isAdjacent(startPoint, endPoint)) {
                                setCurrentLine(null)
                                setLines((prevLines) => [
                                    ...prevLines,
                                    { x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y },
                                ]);
                                activePoints.current.push(endPoint);
                            }
                        } else {
                            setCurrentLine({ x1: startPoint.x, y1: startPoint.y, x2: adjustedX, y2: adjustedY });
                        }
                    }
                }
            },
            onPanResponderRelease: () => {
                activePoints.current = [];
                setCurrentLine(null)
            },
        })
    ).current;

    const findClosestPoint = (x: number, y: number) => {
        let closestPoint: { x: number, y: number } | null = null;
        let minDistance = Infinity;
        pointsRef.current.forEach((row) => {
            row.forEach((point) => {
                if (point) {
                    const distance = Math.hypot(point.x - x, point.y - y);
                    if (distance < minDistance && distance < 10) {
                        minDistance = distance;
                        closestPoint = point;
                    }
                }
            });
        });
        return closestPoint;
    };

    const isAdjacent = (point1: { x: number, y: number }, point2: { x: number, y: number }) => {
        const isAdjacentX = Math.abs(point1.x - point2.x) == 100 && point1.y == point2.y;
        const isAdjacentY = Math.abs(point1.y - point2.y) == 100 && point1.x == point2.x;
        return (isAdjacentX || isAdjacentY);
    };

    const onLayout = () => {
        if (boxRef.current) {
            boxRef.current.measure((x, y, width, height, pageX, pageY) => {
                boxLayoutRef.current = { x: pageX, y: pageY, width, height };
            });
        }
    };

    return (
        <View {...panResponder.panHandlers} >
            <View style={styles.box} onLayout={onLayout} ref={boxRef}>

                {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {Array.from({ length: 3 }).map((_, colIndex) => {
                            const point = { x: colIndex * 100 + 50, y: rowIndex * 100 + 50 };
                            pointsRef.current[rowIndex][colIndex] = point;
                            return <View key={colIndex} style={[styles.point, { left: point.x - 10, top: point.y - 10 }]} />;
                        })}
                    </View>
                ))}
                <Text>{currentCoordinates && (
                    "(" + Math.round(currentCoordinates?.x) + ";" + Math.round(currentCoordinates?.y) + ")"
                )}</Text>
                <Svg style={StyleSheet.absoluteFill}>
                    {lines.map((line, index) => (
                        <Line
                            key={index}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="red"
                            strokeWidth="2"
                        />
                    ))}
                    {currentLine && (
                        <Line
                            key={lines.length}
                            x1={currentLine.x1}
                            y1={currentLine.y1}
                            x2={currentLine.x2}
                            y2={currentLine.y2}
                            stroke="red"
                            strokeWidth="2"
                        />
                    )}
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: 'black',
        position: 'relative',
    },
    row: {
        flexDirection: 'row',
        position: 'absolute',
    },
    point: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        position: 'absolute',
    },
});