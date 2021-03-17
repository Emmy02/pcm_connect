import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";

import { NoGradientButton } from "./../button";

import SvgUri from "react-native-svg-uri";
function TopNavBar({ isMember = false, onPress }) {
  return (
    <View style={styles.topNavBarContainer}>
      <View>{!isMember && <NoGradientButton title="Join Group" />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavBarContainer: {
    position: "absolute",
    width: "100%",
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  joinGroup: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
});

export default TopNavBar;
