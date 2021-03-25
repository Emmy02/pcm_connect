import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { colors } from "./../../config";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function NavBack({ controls, onPress }) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.controlsContainer}>{controls}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: "100%",
    height: 44,
    overflow: "visible",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  backButtonContainer: {
    width: "50%",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, .5)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
});

export default NavBack;
