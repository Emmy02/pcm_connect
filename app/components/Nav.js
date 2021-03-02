import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";

function AppNav() {
  return <View style={styles.navContainer}></View>;
}

const styles = StyleSheet.create({
  navContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 60,
    width: "100%",
    position: "absolute",
    top: 60,
    left: 20,
  },
});

export default AppNav;
