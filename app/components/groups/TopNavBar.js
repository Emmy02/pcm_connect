import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";

import { NoGradientButton } from "./../button";

import SvgUri from "react-native-svg-uri";
function TopNavBar({ isMember = false, onPress }) {
  return (
    <View style={styles.topNavBarContainer}>
      <TouchableOpacity style={styles.goBackBtn}>
        <SvgUri
          width="30"
          height="30"
          style={styles.svg}
          source={require("./../../assets/chevron_left.svg")}
        />
      </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  goBackBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, .5)",
    height: 44,
    width: 44,
    borderRadius: 10,
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
