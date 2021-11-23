import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../colors";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import ErrorAndLoading from "../components/ErrorAndLoading";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const width = Dimensions.get("window").width;

  const handleSignUp = async () => {
    if (!password || !email || !description || !confirmPassword) {
      setError("");
      setFieldEmpty("Please fill all fields");
    } else if (password === confirmPassword) {
      try {
        setIsLoading(true);
        setFieldEmpty("");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email,
            password,
            description,
            username,
          }
        );
        // console.log(response.data);
        setToken(response.data.token);
        setError("");
        setIsLoading(false);
      } catch (error) {
        // console.log(error.response.data);
        email && password && setError("Email or password incorrect");
        setIsLoading(false);
      }
    } else {
      setFieldEmpty("");
      setError("Passwords must be the same");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.inner}>
        <View style={styles.containerLogo}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
              },
            ]}
          >
            Sign up
          </Text>
        </View>
        <View style={{ width: width - 60 }}>
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
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder='password'
          />
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder='confirm password'
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ErrorAndLoading
            isLoading={isLoading}
            error={error}
            fieldEmpty={fieldEmpty}
          />

          <Button
            handlePress={handleSignUp}
            isLoading={isLoading}
            text='Sign up'
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.text]}>Already have an account ? Sign in</Text>
          </TouchableOpacity>
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
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  button: {
    width: 150,
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
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

  error: {
    textAlign: "center",
    color: colors.primary,
  },
});
