import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { validateNumbers } from "../utils/validateNumbers";

interface SquareProps {
  numbers: number[][];
}

export function Square({ numbers }: SquareProps) {
  validateNumbers(numbers);
  return (
    <View>
      {numbers.map((number_rows, row_index) => (
        <View style={styles.squareContainer} key={row_index}>
          {number_rows.map((number, index) => {
            const number_index = numbers.length * (row_index - 1) + index;
            // console.log(number_index);
            return (
              <View style={styles.square} key={number_index}>
                <Text style={styles.squareText}>{number}</Text>
              </View>
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
    width: 50,
    height: 50,
    backgroundColor: "red",
    margin: 2,
    borderRadius: 10,
  },
  squareText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 50,
  },
});