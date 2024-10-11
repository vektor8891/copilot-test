import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { validateNumbers } from "../utils/validateNumbers";

interface SquareProps {
  numbers: number[][];
}

export function Square({ numbers }: SquareProps) {
  const [clickedSquares, setClickedSquares] = useState<number[]>([]);
  const handleSquareClick = (number_index: number) => {
    setClickedSquares((prev) => {
      if (prev.includes(number_index)) {
        return prev.filter((index) => index !== number_index);
      } else {
        return [...prev, number_index];
      }
    });
  };

  validateNumbers(numbers);
  return (
    <View>
      {numbers.map((number_rows, row_index) => (
        <View style={styles.squareContainer} key={row_index}>
          {number_rows.map((number, index) => {
            const number_index = numbers.length * row_index + index;
            const isClicked = clickedSquares.includes(number_index);
            return (
              <TouchableOpacity
                style={[styles.square, isClicked && styles.squareClicked]}
                key={number_index}
                onPress={() => handleSquareClick(number_index)}
              >
                <Text style={styles.squareText}>{number}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  squareContainer: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    margin: 2,
    borderRadius: 10,
  },
  squareClicked: {
    backgroundColor: 'blue',
  },
  squareText: {
    color: "white",
    textAlign: "center",
    fontSize: 50,
    lineHeight: 100,
  },
});