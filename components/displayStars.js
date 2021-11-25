import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function displayStars(stars) {
  const arrayStars = [];
  for (let i = 1; i <= 5; i++) {
    if (stars >= i) {
      arrayStars.push(
        <Ionicons
          name={"star"}
          size={18}
          color='#FFB000'
          style={{ marginRight: 5 }}
          key={i}
        />
      );
    } else {
      arrayStars.push(
        <Ionicons
          name={"star"}
          size={18}
          color='#BBBBBB'
          style={{ marginRight: 5 }}
          key={i}
        />
      );
    }
  }
  return arrayStars;
}
