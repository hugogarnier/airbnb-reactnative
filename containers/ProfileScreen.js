import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import Button from "../components/Button";
import colors from "../constants/colors";
import { width } from "../constants/dimensions";
import imagePickerGallery from "../utils/imagePickerGallery";
import imagePickerCamera from "../utils/imagePickerCamera";
import handleImagePicked from "../utils/handleImagePicked";

export default function ProfileScreen({ setToken, userId, userToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setDescription(response.data.description);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setImage(response.data.photo);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    getUser();
  }, []);

  const handleImageGallery = async () => {
    const imageUri = await imagePickerGallery();
    setImage(imageUri);
  };
  const handleImageCamera = async () => {
    const imageUri = await imagePickerCamera();
    setImage(imageUri);
  };

  const handleLogout = async () => {
    setToken(null);
    navigation.navigate("Home");
  };
  const handleUpdate = () => {
    const response = handleImagePicked(
      image,
      userToken,
      userId,
      email,
      username,
      description
    );
    // console.log(response.data);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.inner}>
        <View style={{ width: width - 60 }}>
          <View style={styles.imageContainer}>
            <Image
              source={
                image
                  ? {
                      uri: image,
                    }
                  : require("../assets/default.png")
              }
              style={styles.image}
              resizeMode='cover'
            />
            <View style={styles.icons}>
              <Ionicons
                name={"images"}
                size={24}
                color={colors.text}
                onPress={handleImageGallery}
              />
              <Ionicons
                name={"camera"}
                size={24}
                color={colors.text}
                style={{ marginLeft: 20 }}
                onPress={handleImageCamera}
              />
            </View>
          </View>
          <TextInput
            placeholder='email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
            style={[styles.inputText]}
          />
          <TextInput
            placeholder='username'
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize='none'
            style={[styles.inputText]}
          />
          <TextInput
            placeholder='describe yourself in a few words...'
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
            autoCapitalize='none'
            style={[styles.inputText, styles.description]}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button handlePress={handleUpdate} text='Update' isLoading={false} />
          <Button handlePress={handleLogout} text='Log out' isLoading={false} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: colors.text,
  },

  inputText: {
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  description: {
    padding: 5,
    height: 80,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.primary,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 75,
    marginBottom: 20,
  },

  icons: {
    flexDirection: "row",
    marginBottom: 20,
  },

  error: {
    textAlign: "center",
    color: colors.primary,
  },
});
