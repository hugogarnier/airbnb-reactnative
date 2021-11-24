import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import RoomsList from "../components/RoomsList";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const rooms = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    rooms();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LottieView
          source={require("../assets/home-lottie.json")}
          autoPlay
          loop
          style={{
            width: 400,
            height: 400,
          }}
        />
      ) : (
        <RoomsList data={data} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
