import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { View } from "react-native";
import axios from "axios";
import storage from "../miscellaneous/AsyncStorage";
import SyncStorage from "sync-storage";
import { addData, getData } from "../utils/SyncStoragePref";

const Login = () => {
  const [email, setEmail] = useState("test6@gmail.com");
  const [password, setPassword] = useState("1212");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // const test = async () => {
  //   const data = await SyncStorage.init();
  //   console.log("AsyncStorage is ready!", data);

  //   addData("foo", "Sandyyy");
  //   const res = await getData("foo");
  //   console.log(res);
  // };

  const loginHandle = async () => {
    router.push("/chat");
    // test();
    return;

    if (!email || !validateEmail(email)) {
      ToastAndroid.show("Please enter a valid Email Id!!", ToastAndroid.SHORT);
      return;
    }

    if (!password) {
      ToastAndroid.show("Please enter password", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const headerConfig = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var { data } = await axios.post(
        "https://cheat-chat.onrender.com/api/user/login",
        {
          email: email,
          password: password,
        },
        headerConfig
      );

      console.log("Data", data);

      // storage.save({
      //   key: "UserInfo", // Note: Do not use underscore("_") in key!
      //   data: data,
      //   expires: null,
      // });
      addData("UserInfo", data);

      console.log("Data added successfully!!");
      router.push("/chat");

      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{ paddingStart: 30, paddingEnd: 20 }}>
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
            value={email}
            onChangeText={(text) => {
              setEmail(text);
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

      <TouchableOpacity
        style={{
          alignItems: "stretch",
          paddingStart: 20,
          paddingEnd: 20,
          marginTop: 20,
          width: "100%",
        }}
        onPress={loginHandle}
      >
        <Text
          style={{
            backgroundColor: loading ? "#98c1e7" : "#3183CF",
            borderRadius: 10,
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
