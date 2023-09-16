import React from "react";
import { Text, View } from "react-native";

const ReceiverCard = ({ message }) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: "#BFE2F8",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        marginStart: 10,
        marginEnd: 100,
      }}
    >
      <Text>{message.content}</Text>
    </View>
  );
};

export default ReceiverCard;
