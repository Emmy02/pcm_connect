import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";

import SvgUri from "react-native-svg-uri";

function GroupNav({ index, onPress }) {
  return (
    <View style={styles.groupNavContainer}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => onPress(0)} style={[styles.btn]}>
          <SvgUri
            width="20"
            height="20"
            style={styles.svg}
            source={require("./../../assets/group/home.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(1)} style={[styles.btn]}>
          <SvgUri
            width="20"
            height="20"
            style={styles.svg}
            source={require("./../../assets/group/user.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(2)} style={[styles.btn]}>
          <SvgUri
            width="20"
            height="20"
            style={styles.svg}
            source={require("./../../assets/group/chat.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(3)} style={[styles.btn]}>
          <SvgUri
            width="20"
            height="20"
            style={styles.svg}
            source={require("./../../assets/group/coolicon-1.svg")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupNavContainer: {
    position: "absolute",
    top: 175,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  menuContainer: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
  },
  btn: {
    marginHorizontal: 20,
  },
});

export default GroupNav;
