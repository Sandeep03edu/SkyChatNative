import React from "react";
import { Image, TouchableOpacity } from "react-native";

const HeaderBtn = ({ iconUrl }) => {
  return (
    <TouchableOpacity
      style={{ width: 40, height: 40, justifyContent: "center" }}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={{ width: "60%", height: "60%" }}
      ></Image>
    </TouchableOpacity>
  );
};

export default HeaderBtn;
