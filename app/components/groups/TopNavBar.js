import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import colors from "../../config/colors";

import { NoGradientButton } from "./../button";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function TopNavBar({ isMember = false, onPress, onBack }) {
  return (
    <SafeAreaView style={styles.topNavBarContainer}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <TouchableOpacity onPress={onBack} style={styles.button}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View>
          {!isMember && (
            <NoGradientButton title="Join Group" onPress={onPress} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topNavBarContainer: {
    position: "absolute",
    width: "100%",
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

export default TopNavBar;
