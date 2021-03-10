import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";

import SvgUri from "react-native-svg-uri";

import { GradientCard } from "./../components/card";
function WelcomeBox({ fullName, onPress }) {
  return (
    <TouchableOpacity style={{ zIndex: -1 }} onPress={onPress}>
      <GradientCard>
        <Text style={styles.text}>Welcome back </Text>
        <Text style={styles.group}>{fullName}</Text>
        <Text style={styles.group}>Go to your Group</Text>
        <SvgUri
          width="34"
          height="34"
          style={styles.icon}
          source={require("./../assets/arrow.svg")}
        />
      </GradientCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  group: {
    fontSize: 16,
    fontWeight: "200",
    color: colors.white,
    paddingBottom: 10,
  },
});

export default WelcomeBox;
