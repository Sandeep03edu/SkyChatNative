import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getSender } from "./ChatLogics";

const ChatCard = ({ loggedUser, chat, onClickHandle }) => {
  return (
    <TouchableOpacity onPress={onClickHandle}>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#E9E9E8",
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </Text>
        </View>

        <View>
          <Text>
            {chat.latestMessage.sender.name} :{" "}
            {chat.latestMessage.content.length > 50
              ? chat.latestMessage.content.substring(0, 51) + "..."
              : chat.latestMessage.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
