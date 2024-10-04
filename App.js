import { StyleSheet, Text, View } from "react-native";
import { Square } from "./src/components/Square_click";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>4</Text>
      <Square numbers={[[1, 2], [3, 1]]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 100,
  },
});
