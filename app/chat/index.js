import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants/theme";
import HeaderBtn from "../miscellaneous/HeaderBtn";
import ChatCard from "../chat/ChatCard";
import SearchCard from "../miscellaneous/SearchCard";
import { getuser } from "../utils/UserUtils";
import axios from "axios";

const index = () => {
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [allChats, setAllChats] = useState([]);
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const router = useRouter();

  const fetchSearchResult = async (query) => {
    if (!query) {
      return;
    }

    console.log("Search Query", query);

    if (!user.token) {
      console.log("User not fetched!!");
      return;
    }

    setSearchLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://cheat-chat.onrender.com/api/user?search=${query}`,
        config
      );
      console.log("Search Res: ", data);
      setSearchQueryResult(data);
    } catch (error) {
      console.log("Search Error", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchAllChats = async () => {
    if (!user.token) {
      console.log("User not fetched!!");
      return;
    }
    setChatLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        "https://cheat-chat.onrender.com/api/chat",
        config
      );

      setAllChats(data);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    getuser(setUser);
    fetchAllChats();
  }, [user]);

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
          headerRight: () => {
            return <HeaderBtn iconUrl={user} />;
          },
        }}
      />

      <View>
        <TextInput
          style={{
            backgroundColor: "#ECF2F6",
            marginHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 5,
            marginVertical: 5,
            fontSize: 16,
            paddingHorizontal: 5,
          }}
          placeholder="Search user"
          onChangeText={(text) => {
            setSearchQuery(text);
            fetchSearchResult(text);
          }}
        />
      </View>

      {searchQuery.length !== 0 ? (
        searchLoading ? (
          <ActivityIndicator size={"large"} color={"#312651"} />
        ) : (
          <View style={{ marginBottom: 10 }}>
            <FlatList
              data={searchQueryResult}
              renderItem={({ item }) => <SearchCard user={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        )
      ) : chatLoading ? (
        <ActivityIndicator size={"large"} color={"#312651"} />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <FlatList
            data={allChats}
            renderItem={({ item }) => (
              <ChatCard
                loggedUser={user}
                chat={item}
                onClickHandle={() => {
                  const chatId = item._id;
                  router.push(`chat-messages/${chatId}`);
                }}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;
