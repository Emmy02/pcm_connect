import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";

function FillButton({ title, onPress }) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <LinearGradient
        start={{ x: 1.7, y: 0.1 }}
        locations={[0.1, 1]}
        colors={[colors.primary, colors.secondary]}
        style={styles.background}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  background: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "400",
  },
});

export default FillButton;
