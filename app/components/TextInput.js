import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import { colors } from "../config";

function AppTextInput({ width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.textInput]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    maxHeight: 55,
  },
  textInput: {
    backgroundColor: colors.light,
    height: "100%",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
});

export default AppTextInput;
