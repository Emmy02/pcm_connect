import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    color: colors.light,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;