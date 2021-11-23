import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../colors";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import ErrorAndLoading from "../components/ErrorAndLoading";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const width = Dimensions.get("window").width;

  const handleLogin = async () => {
    if (!password || !email) {
      setFieldEmpty("Please fill all fields");
    } else {
      try {
        setIsLoading(true);
        setFieldEmpty("");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
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
            Sign in
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

          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder='password'
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ErrorAndLoading
            isLoading={isLoading}
            error={error}
            fieldEmpty={fieldEmpty}
          />
          <Button
            handlePress={handleLogin}
            isLoading={isLoading}
            text='Sign in'
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={[styles.text]}>No account ? Register</Text>
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

  eyeIcon: {
    position: "absolute",
    top: 0,
    right: 10,
  },
});
