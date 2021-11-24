import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function AroundMeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Around me screen</Text>
      <Button
        title='Go to Profile'
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
