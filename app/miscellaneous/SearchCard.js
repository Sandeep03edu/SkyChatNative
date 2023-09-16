import React from "react";
import { View, Text } from "react-native";

const SearchCard = ({ user }) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ADD8E6",
        marginTop: 10,
        marginHorizontal: 10,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
      </View>

      <View>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};

export default SearchCard;
