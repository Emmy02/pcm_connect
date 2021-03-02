import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";

function UniversityPointer({ university }) {
  const { name } = university;

  return (
    <View style={styles.button}>
      <LinearGradient
        start={{ x: 0.3, y: 0.1 }}
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
      >
        <Text style={styles.text}>{name}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
  },
  background: {
    borderRadius: 20,
    padding: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.medium,
    fontSize: 14,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    textTransform: "capitalize",
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UniversityPointer;
