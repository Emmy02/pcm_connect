import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconListItem({ name, text, size = 40, iconColor = "#fff" }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        marginVertical: 5,
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={24} />
      <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{text}</Text>
    </View>
  );
}

export default IconListItem;
