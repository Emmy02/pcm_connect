import React from "react";
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";

import colors from "../../config/colors";

import { NoGradientButton } from "./../button";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IMLocalized } from "./../../config/IMLocalized";

function TopNavBar({
  canSubscribe,
  showJoin,
  onPress,
  onBack,
  onSubscribe,
  onUnSubscribe,
  canUnSubscribe,
  canCancelJoin,
  cancelJoin,
  canLeave,
  onLeave,
}) {
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
        <View style={styles.controlsContainer}>
          {showJoin && (
            <NoGradientButton
              title={IMLocalized("join_group")}
              onPress={onPress}
              width="48%"
            />
          )}
          {canCancelJoin && (
            <NoGradientButton
              title={IMLocalized("cancel") + " " + IMLocalized("join_group")}
              onPress={cancelJoin}
              width="48%"
              color="danger"
            />
          )}

          {canSubscribe && (
            <NoGradientButton
              title={IMLocalized("subscribe")}
              onPress={onSubscribe}
              color="secondary"
              width="48%"
            />
          )}
          {canUnSubscribe && (
            <NoGradientButton
              title={IMLocalized("unSubscribe")}
              onPress={onUnSubscribe}
              color="danger"
              width="50%"
            />
          )}

          {canLeave && (
            <NoGradientButton
              title={IMLocalized("leave")}
              onPress={onLeave}
              color="danger"
              width="50%"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topNavBarContainer: {
    marginTop: 30,
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
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "70%",
  },
});

export default TopNavBar;
