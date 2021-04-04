import React from "react";
import { StyleSheet, View, Image } from "react-native";

import colors from "../config/colors";
import Text from "./Text";

function MemberCount({ count, avatars = [] }) {
  return (
    <View style={styles.container}>
      {avatars.map((avatar, index) => (
        <Image source={avatar} style={styles.image} key={index} />
      ))}
      <Text style={styles.text}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .6)",
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 3,
    position: "absolute",
    right: 5,
    top: 10,
    minWidth: 30,
    maxWidth: 80,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "bold",
    paddingLeft: 5,
  },
  image: {
    width: 14,
    height: 14,
    borderRadius: 5,
  },
});

export default MemberCount;
