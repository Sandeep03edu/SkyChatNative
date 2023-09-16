import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { View } from "react-native";
import axios from "axios";
import storage from "../miscellaneous/AsyncStorage";
import { addData } from "../utils/SyncStoragePref";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const SignUp = () => {
  const [name, setName] = useState("Sandy");
  const [emailId, setEmailId] = useState("test@gmail.com");
  const [password, setPassword] = useState("121212");
  const [confirmPassword, setConfirmPassword] = useState("121212");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    if (!name || !emailId || !password || !confirmPassword) {
      ToastAndroid.show("Please enter all details!!", ToastAndroid.SHORT);
      return;
    }

    if (!validateEmail(emailId)) {
      ToastAndroid.show("Please enter a valid email Id!!", ToastAndroid.SHORT);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show(
        "Please enter a password of minimum 6 characters!!",
        ToastAndroid.SHORT
      );
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Password Mismatched!!", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const headerConfig = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        name,
        email: emailId,
        password,
        pic,
      };

      console.log("Body:", body);

      const { data } = await axios.post(
        "https://cheat-chat.onrender.com/api/user",
        body,
        headerConfig
      );
      ToastAndroid.show("Registration successful!!", ToastAndroid.SHORT);

      // storage.save({
      //   key: "UserInfo", // Note: Do not use underscore("_") in key!
      //   data: data,
      //   expires: null,
      // });

      addData("UserInfo", data);

      setLoading(false);
      console.log(data);
      router.push("/chat");
    } catch (error) {
      console.log("Error", error);
      ToastAndroid.show("An error occurred!!" + error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{ paddingStart: 30, paddingEnd: 20 }}>
        <Text style={{ fontSize: 18 }}>Name </Text>
      </View>

      <View style={{ paddingStart: 20, paddingEnd: 20, borderRadius: 20 }}>
        <View
          style={{
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
          }}
        >
          <TextInput
            placeholder="Sandeep Mishra"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            style={{
              fontSize: 16,
              paddingStart: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>

      <View style={{ paddingStart: 30, paddingEnd: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 18 }}>Email Id </Text>
      </View>

      <View style={{ paddingStart: 20, paddingEnd: 20, borderRadius: 20 }}>
        <View
          style={{
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
          }}
        >
          <TextInput
            placeholder="test@gmail.com"
            value={emailId}
            onChangeText={(text) => {
              setEmailId(text);
            }}
            style={{
              fontSize: 16,
              paddingStart: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>

      <View style={{ paddingStart: 30, paddingEnd: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 18 }}>Password </Text>
      </View>

      <View style={{ paddingStart: 20, paddingEnd: 20, borderRadius: 20 }}>
        <View
          style={{
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
          }}
        >
          <TextInput
            placeholder="S$!121Sa"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={{
              fontSize: 16,
              paddingStart: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>

      <View style={{ paddingStart: 30, paddingEnd: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 18 }}>Confirm Password </Text>
      </View>

      <View style={{ paddingStart: 20, paddingEnd: 20, borderRadius: 20 }}>
        <View
          style={{
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "#F5F5F5",
          }}
        >
          <TextInput
            placeholder="S$!121Sa"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            style={{
              fontSize: 16,
              paddingStart: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={registerUser}
        style={{
          alignItems: "stretch",
          paddingStart: 20,
          paddingEnd: 20,
          marginTop: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            backgroundColor: loading ? "#98c1e7" : "#3183CF",
            backgroundColor: "#3183CF",
            borderRadius: 10,
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
