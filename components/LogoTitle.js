import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function LogoTitle() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Home")}>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("../assets/logo.png")}
      />
    </Pressable>
  );
}
