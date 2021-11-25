import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import { width } from "../constants/dimensions";
import displayStars from "./displayStars";

export default function RoomsList({ data }) {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    // console.log(item.photos[0].url);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Room", { id: item._id })}
      >
        <View style={styles.roomContainer}>
          <View style={styles.photos}>
            <Image
              source={{ uri: item.photos[0].url }}
              style={{ width: width, height: 250, position: "relative" }}
            />
            <Text style={styles.textPrice}>{item.price} €</Text>
          </View>
          <View style={styles.infosContainer}>
            <View style={styles.infos}>
              <Text numberOfLines={1} style={styles.textTitle}>
                {item.title}
              </Text>
              <View style={styles.stars}>
                {/* <Stars stars={item.ratingValue} /> */}
                <View style={{ flexDirection: "row" }}>
                  {displayStars(item.ratingValue)}
                </View>
                <Text
                  style={{ fontSize: 14, color: colors.text, marginLeft: 10 }}
                >
                  {item.reviews} reviews
                </Text>
              </View>
            </View>
            <Image
              source={{ uri: item.user?.account.photo.url }}
              style={{ width: 70, height: 70, borderRadius: 50 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    width: width - 20,
  },
  roomContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
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
});
