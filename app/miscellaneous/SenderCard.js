import React from "react";
import { Text, View } from "react-native";

const SenderCard = ({ message }) => {
  return (
    <View
      style={{
        width: "auto",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        marginEnd: 10,
        marginStart: 100,
        alignSelf: "flex-end",
        backgroundColor: "#BFE2F8",
      }}
    >
      <Text>{message.content}</Text>
    </View>
  );
};

export default SenderCard;
