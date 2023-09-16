import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import send from "../../assets/icons/send.png";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

const TypeMessgae = ({ sendMessage, setSendMessage, handleOnClick }) => {
  return (
    <View
      style={{
        backgroundColor: "#E1E1E0",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        maxHeight: 150,
      }}
    >
      <View style={{ flex: 1 }}>
        <AutoGrowingTextInput
          placeholder="Enter Message"
          value={sendMessage}
          onChangeText={(text) => setSendMessage(text)}
        />
      </View>
      <TouchableOpacity
        style={{ paddingHorizontal: 10 }}
        onPress={handleOnClick}
      >
        <Image
          source={send}
          resizeMode="cover"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TypeMessgae;
