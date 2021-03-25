import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Title({ children, style, controls, ...otherProps }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, style]} {...otherProps}>
        {children}
      </Text>
      {controls && <View>{controls}</View>}
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 20,
    marginRight: 10,
    textTransform: "capitalize",
  },
});

export default Title;
