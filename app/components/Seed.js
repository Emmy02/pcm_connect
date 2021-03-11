import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, defaultStyles } from "../config";

function Seed({ title, active, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {active && (
        <LinearGradient
          start={{ x: 1.7, y: 0.1 }}
          locations={[0.1, 1]}
          colors={[colors.primary, colors.secondary]}
          style={styles.background}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      )}
      {!active && (
        <LinearGradient
          start={{ x: 0.3, y: 0.1 }}
          colors={[colors.secondary, colors.primary]}
          style={styles.background}
        >
          <Text style={styles.notActiveText}>{title}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginVertical: 10,
    ...defaultStyles.shadows,
    marginLeft: 10,
  },
  background: {
    borderRadius: 20,
    padding: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "400",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  notActiveText: {
    color: colors.dark,
    fontSize: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    textTransform: "capitalize",
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Seed;
