import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import MapView, { Marker } from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import { width, height } from "../constants/dimensions";
import colors from "../constants/colors";
import displayStars from "../components/displayStars";

export default function RoomScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [numberOfLines, setNumberOflLines] = useState(3);

  useEffect(() => {
    const rooms = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    rooms();
  }, []);

  const handleShow = () => {
    numberOfLines === 3 ? setNumberOflLines(0) : setNumberOflLines(3);
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <View style={styles.roomContainer}>
          <View style={styles.photos}>
            <SwiperFlatList
              autoplay={false}
              index={0}
              showPagination
              data={data.photos}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.url }}
                  style={{ width: width, height: 250, position: "relative" }}
                />
              )}
            />
            <Text style={styles.textPrice}>{data.price} €</Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={styles.infosContainer}>
              <View style={styles.infos}>
                <Text numberOfLines={1} style={styles.textTitle}>
                  {data.title}
                </Text>
                <View style={styles.stars}>
                  <View style={{ flexDirection: "row" }}>
                    {displayStars(data.ratingValue)}
                  </View>
                  <Text
                    style={{ fontSize: 14, color: colors.text, marginLeft: 10 }}
                  >
                    {data.reviews} reviews
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: data.user?.account.photo.url }}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />
            </View>
            <Text style={{ textAlign: "left" }} numberOfLines={numberOfLines}>
              {data.description}
            </Text>
            <TouchableOpacity onPress={handleShow}>
              <Text style={{ color: colors.text, marginTop: 10 }}>
                {numberOfLines === 3 ? "Show more" : "Show less"}
              </Text>
            </TouchableOpacity>
          </View>
          <MapView
            style={styles.map}
            region={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              // icon={require("../assets/marker.png")}
            />
          </MapView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    width: width - 20,
  },
  roomContainer: {
    flex: 1,
    marginBottom: 20,
  },
  photos: {},
  textPrice: {
    position: "absolute",
    bottom: 10,
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
    color: "white",
    backgroundColor: "black",
  },
  infosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infos: {
    flex: 3,
  },
  textTitle: {
    fontSize: 20,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  map: {
    marginTop: 20,
    width: width,
    height: Platform.OS === "ios" ? height - 600 : height - 500,
  },
});
