import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function NoGradientButton({ title, color = "primary", onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: color === "clear" ? colors.black : colors.white },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 10,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "400",
  },
});

export default NoGradientButton;
