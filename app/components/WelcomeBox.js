import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

import SvgUri from "react-native-svg-uri";

import { IMLocalized } from "./../config/IMLocalized";

import { GradientCard } from "./../components/card";
function WelcomeBox({ fullName, onPress, pending = false }) {
  return (
    <TouchableOpacity style={{ zIndex: -1 }} onPress={onPress}>
      <GradientCard>
        <Text style={styles.text}>{IMLocalized("welcomeBack")}</Text>
        <Text style={styles.group}>{fullName}</Text>
        <Text style={styles.group}>{IMLocalized("goToMyGroup")}</Text>
        <SvgUri
          width="34"
          height="34"
          style={styles.icon}
          source={require("./../assets/arrow.svg")}
        />
        {pending && (
          <Text style={{ color: colors.white, paddingTop: 10 }}>
            {IMLocalized("pending")}{" "}
          </Text>
        )}
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
