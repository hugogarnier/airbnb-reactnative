import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../colors";

export default function PasswordInput({ password, setPassword, placeholder }) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const handleVisibilityPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={passwordVisible}
        autoCapitalize='none'
        style={[styles.inputText, { position: "relative" }]}
      />
      {passwordVisible ? (
        <Ionicons
          style={styles.eyeIcon}
          name='eye'
          size={20}
          color={colors.text}
          onPress={handleVisibilityPassword}
        />
      ) : (
        <Ionicons
          style={styles.eyeIcon}
          name='eye-off'
          size={20}
          color={colors.text}
          onPress={handleVisibilityPassword}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  eyeIcon: {
    position: "absolute",
    top: 0,
    right: 10,
  },
});
