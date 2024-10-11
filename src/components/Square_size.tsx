import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';

interface SquareProps {
    numbers: number[][];
}

export function Square({ numbers }: SquareProps) {
    console.log(numbers)
    const boxLayoutRef = useRef<{ x: number, y: number, width: number, height: number } | null>(null);
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
                }
            },
            onPanResponderMove: (evt) => {
                const { pageX, pageY } = evt.nativeEvent;
                const boxLayout = boxLayoutRef.current;
                if (boxLayout) {
                    const adjustedX = pageX - boxLayout.x;
                    const adjustedY = pageY - boxLayout.y;
                    setCurrentCoordinates({ x: adjustedX, y: adjustedY });
                }
            },
            onPanResponderRelease: () => {
            },
        })
    ).current;

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
                <Text>{currentCoordinates && (
                    "(" + Math.round(currentCoordinates?.x) + ";" + Math.round(currentCoordinates?.y) + ")"
                )}</Text>
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
    }
});