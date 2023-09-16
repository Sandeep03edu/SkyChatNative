import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { COLORS } from "./constants/theme";
import HeaderBtn from "./miscellaneous/HeaderBtn";
import menu from "../assets/icons/menu.png";
import Tabs from "./miscellaneous/Tabs";

const Home = () => {
  data = ["Login", "Sign Up"];
  const [activeTab, setActiveTab] = useState(data[0]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: "Cheat Chat",
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerLeft: () => {
            return <HeaderBtn iconUrl={menu} />;
          },
          headerRight: () => {},
        }}
      />
      <View style={{ marginTop: 10 }}>
        <Tabs tabs={data} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      {activeTab == data[0] ? <Login /> : <SignUp />}
    </SafeAreaView>
  );
};

export default Home;
