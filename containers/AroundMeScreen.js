import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import LottieView from "lottie-react-native";

import { height, width } from "../constants/dimensions";

export default function AroundMeScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCoords(obj);
      } else {
        setError(true);
      }
    };

    askPermission();
  }, []);

  useEffect(() => {
    const rooms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    rooms();
  }, [coords]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LottieView
          source={require("../assets/maps.json")}
          autoPlay
          loop
          style={{
            width: 400,
            height: 400,
          }}
        />
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <>
          <MapView
            // La MapView doit obligatoirement avoir des dimensions
            style={{ width: width, height: height }}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
            showsUserLocation={true}
          >
            {data.map((marker) => {
              return (
                <Marker
                  coordinate={{
                    latitude: marker.location[1],
                    longitude: marker.location[0],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  key={marker._id}
                  image={require("../assets/acc.png")}
                  onPress={() =>
                    navigation.navigate("Room", { id: marker._id })
                  }
                />
              );
            })}
          </MapView>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
