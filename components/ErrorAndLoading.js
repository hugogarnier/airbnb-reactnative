import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import colors from "../colors";

export default function ErrorAndLoading({ isLoading, error, fieldEmpty }) {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size='large' color={colors.primary} />
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {fieldEmpty ? (
        <Text style={[styles.error, { textAlign: "center", marginBottom: 10 }]}>
          {fieldEmpty}
        </Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    color: colors.primary,
  },
});
