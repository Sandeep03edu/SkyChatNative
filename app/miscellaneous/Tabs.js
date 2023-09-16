import React from "react";
import { FlatList, View } from "react-native";
import TabCard from "./TabCard";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
        }}
        renderItem={({ item }) => (
          <TabCard
            name={item}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab(item);
            }}
          />
        )}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
};

export default Tabs;
