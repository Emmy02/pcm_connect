import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function UniversityPointer({ university }) {
  const { name } = university;

  return (
    <View style={styles.button}>
      <LinearGradient
        start={{ x: 0.3, y: 0.1 }}
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
      >
        <MaterialCommunityIcons
          name={"school-outline"}
          size={24}
          color={colors.white}
          style={styles.icon}
        />
        <Text numberOfLines={1} style={styles.text}>
          {name.substring(0, 20) + "..."}
        </Text>
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
    overflow: "hidden",
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
  icon: {
    paddingHorizontal: 5,
  },
});

export default UniversityPointer;
