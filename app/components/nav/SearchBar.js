import React from "react";

import { StyleSheet, View, TextInput } from "react-native";
import { colors } from "./../../config";

import SvgUri from "react-native-svg-uri";
import { IMLocalized } from "./../../config/IMLocalized";

function SearchBar({ onFocus, onChangeText }) {
  return (
    <View style={styles.searchBarContainer}>
      <SvgUri
        width="22"
        height="22"
        style={styles.svg}
        source={require("./../../assets/search.svg")}
      />
      <TextInput
        onFocus={onFocus}
        onChangeText={onChangeText}
        placeholder={IMLocalized("findGroupsLabel")}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: 210,
    height: 44,
    backgroundColor: colors.light,
    borderRadius: 22,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 7,
  },
  svg: {
    position: "absolute",
    left: 7,
  },
});

export default SearchBar;
