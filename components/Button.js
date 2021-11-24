import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";

export default function Button({ handlePress, isLoading, text }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text style={[styles.text, { textAlign: "center" }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
  },
  text: {
    color: colors.text,
  },
});
