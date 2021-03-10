import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";

function OutLineButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
    marginVertical: 10,
    width: "100%",
  },
  background: {
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  text: {
    width: "100%",
    color: "rgba(2, 82, 111, 1)",
    fontSize: 14,
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 10,
    textTransform: "capitalize",
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default OutLineButton;
