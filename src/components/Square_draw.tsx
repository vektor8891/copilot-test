import React, { useRef } from 'react';
import { View } from 'react-native';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';

interface SquareProps {
    numbers: number[][];
}

export function Square({ numbers }: SquareProps) {
    const canvasRef = useRef<Canvas>(null);
    const isDrawing = useRef(false);

    const handleCanvas = (canvas: Canvas) => {
        if (!canvas) return;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        const startDrawing = (event: any) => {
            isDrawing.current = true;
            context.beginPath();
            context.moveTo(event.nativeEvent.locationX, event.nativeEvent.locationY);
        };

        const draw = (event: any) => {
            if (!isDrawing.current) return;
            context.lineTo(event.nativeEvent.locationX, event.nativeEvent.locationY);
            context.stroke();
        };

        const stopDrawing = () => {
            isDrawing.current = false;
            context.closePath();
        };

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('touchcancel', stopDrawing);
    };

    return (
        <View>
            <Canvas
                ref={canvasRef}
                style={{ width: 500, height: 500, borderWidth: 1, borderColor: 'black' }}
                onCanvasCreate={handleCanvas}
            />
        </View>
    );
}