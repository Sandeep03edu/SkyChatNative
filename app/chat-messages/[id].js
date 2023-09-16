import { useSearchParams } from "expo-router";
import { Stack, useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { addChats, getChats, getuser, saveChat } from "../utils/UserUtils";
import axios from "axios";
import { isUserSender } from "../chat/ChatLogics";
import SenderCard from "../miscellaneous/SenderCard";
import ReceiverCard from "../miscellaneous/ReceiverCard";
import { COLORS } from "../constants/theme";
import HeaderBtn from "../miscellaneous/HeaderBtn";
import TypeMessgae from "../miscellaneous/TypeMessgae";
import storage from "../miscellaneous/AsyncStorage";
import { addData, getData } from "../utils/SyncStoragePref";

const { io } = require("socket.io-client");

const index = () => {
  const params = useSearchParams();
  const chatId = params.id;

  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState("");
  const [sockedConnected, setSockedConnected] = useState(false);

  const ENDPOINT = "http://cheat-chat.onrender.com";
  var socket = io(ENDPOINT);

  useEffect(() => {
    console.log("Creating socket for user");
    // socket = io(ENDPOINT);
    if (!user.token) {
      return;
    }
    socket.emit("setup", user);
    socket.on("Connected", () => {
      setSockedConnected(true);
      console.log("Socket Connected!!");
    });

    // socket.on("Typing", () => {
    //   setIsTyping(true);
    // });

    // socket.on("Stop Typing", () => {
    //   setIsTyping(false);
    // });
  }, [user]);

  useEffect(() => {
    console.log(
      "Messages",
      messages.length === 0
        ? "No Message MC"
        : messages[messages.length - 1].content
    );
  }, [messages]);

  useEffect(() => {
    console.log(
      "Socket UseEffect",
      messages.length === 0
        ? "No Message MC"
        : `${messages.length} ` + messages[messages.length - 1].content
    );
    socket.on("Message Received", (newMessageReceived) => {
      console.log("Message Received!!", newMessageReceived.content);
      if (chatId !== newMessageReceived.chat._id) {
        return;
      }

      addNewMessage(newMessageReceived);
    });
  });

  const addNewMessage = async (newMessage) => {
    const prevMess = await getData(chatId);
    console.log("PrevMess: ", prevMess.length);
    const finalData = [...prevMess, newMessage];
    setMessages(finalData);
    addData(chatId, finalData);
  };

  const sendTypedMessage = async () => {
    if (!sendMessage) {
      return;
    }

    if (!user.token) {
      console.log("User Not Fetched!!");
      return;
    }
    const newMessage = sendMessage;
    setSendMessage("");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://cheat-chat.onrender.com/api/message",
        {
          content: newMessage,
          chatId: chatId,
        },
        config
      );

      socket.emit("New Message", data);
      const finalData = [...messages, data];
      setMessages(finalData);
      addData(chatId, finalData);
    } catch (error) {
      console.log("Send Message Error", error);
    }
  };

  const fetchAllMessages = async () => {
    if (!user.token) {
      console.log("User not fetched!!");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        `https://cheat-chat.onrender.com/api/message/${chatId}`,
        config
      );

      const finalData = data;
      console.log(data[0].chat.users);
      setMessages(finalData);

      addData(chatId, finalData);

      socket.emit("Join Chat", chatId);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getuser(setUser);
    fetchAllMessages();
  }, [user]);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: "Cheat Chat",
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerRight: () => {
            return <HeaderBtn iconUrl={user} />;
          },
        }}
      />
      {loading ? (
        <ActivityIndicator size={"large"} color={"#312651"} />
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              //   position: "absolute",
              //   bottom: 0,
              width: "100%",
              flex: 1,
              flexGrow: 1,
            }}
          >
            <FlatList
              data={[...messages].reverse()}
              inverted={true}
              renderItem={({ item }) =>
                isUserSender(user, item) ? (
                  <SenderCard message={item} />
                ) : (
                  <ReceiverCard message={item} />
                )
              }
              keyExtractor={(item) => item._id}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            />
            <TypeMessgae
              sendMessage={sendMessage}
              setSendMessage={setSendMessage}
              handleOnClick={sendTypedMessage}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;
