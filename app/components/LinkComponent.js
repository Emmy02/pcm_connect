import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import * as WebBrowser from "expo-web-browser";

import colors from "../config/colors";

function LinkComponent({ text, url }) {
  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={_handlePressButtonAsync}>
        <Text
          style={{
            color: colors.black,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 2,
  },
});

export default LinkComponent;
