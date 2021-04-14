import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

import colors from "../config/colors";

function LinkComponent({ text, url }) {
  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_handlePressButtonAsync}>
        <Text style={{ color: colors.black, textAlign: "center" }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});

export default LinkComponent;
