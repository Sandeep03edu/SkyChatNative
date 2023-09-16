import React from "react";
import { Text, TouchableOpacity } from "react-native";

const TabCard = ({ name, activeTab, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          backgroundColor: name === activeTab ? "#3183CF" : "#FFFFFF",
          color: name === activeTab ? "#FFF" : "#000",
          fontSize: 16,
          fontWeight: "bold",
          width: "100%",
          height: 40,
          marginStart: 40,
          marginEnd: 40,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 20,
          textAlign: "center",
          textAlignVertical: "center",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default TabCard;
