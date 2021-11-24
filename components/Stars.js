import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Stars({ stars }) {
  const arrayStars = [];
  for (let i = 0; i < stars; i++) {
    arrayStars.push(i);
  }
  const arrayStarsEmpty = [];
  for (let i = 5; i > stars; i--) {
    arrayStarsEmpty.push(i);
  }

  return (
    <>
      {arrayStars.map((item) => {
        return (
          <Ionicons
            key={item}
            name={"star"}
            size={18}
            color='#FFB000'
            style={styles.star}
          />
        );
      })}
      {arrayStarsEmpty.map((item) => {
        return <Ionicons key={item} name={"star"} size={18} color='#BBBBBB' />;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  star: {
    marginRight: 5,
  },
});
