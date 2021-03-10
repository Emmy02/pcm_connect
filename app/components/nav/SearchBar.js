import React from "react";

import { StyleSheet, View, TextInput } from "react-native";
import { colors, defaultStyles } from "./../../config";

import SvgUri from "react-native-svg-uri";

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <SvgUri
        width="22"
        height="22"
        style={styles.svg}
        source={require("./../../assets/search.svg")}
      />
      <TextInput placeholder="Find a Group by name"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: 210,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 22,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 7,
    borderColor: colors.clear,
    borderWidth: 1,
  },
  svg: {
    position: "absolute",
    left: 7,
  },
});

export default SearchBar;
