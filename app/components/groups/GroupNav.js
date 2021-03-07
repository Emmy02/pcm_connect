import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";

import SvgUri from "react-native-svg-uri";

function GroupNav({ onPress }) {
  return (
    <View style={styles.groupNavContainer}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={[styles.btn]}>
          <SvgUri
            width="24"
            height="24"
            style={styles.svg}
            source={require("./../../assets/group/home.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn]}>
          <SvgUri
            width="24"
            height="24"
            style={styles.svg}
            source={require("./../../assets/group/user.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn]}>
          <SvgUri
            width="24"
            height="24"
            style={styles.svg}
            source={require("./../../assets/group/chat.svg")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn]}>
          <SvgUri
            width="24"
            height="24"
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  menuContainer: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,.5)",
    alignItems: "center",
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
