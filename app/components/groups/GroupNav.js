import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import SvgUri from "react-native-svg-uri";
import { colors } from "../../config";

function GroupNav({
  isGroupMember,
  isGroupOwner,
  containerStyles,
  onPress,
  user,
  image,
}) {
  return (
    <View style={containerStyles}>
      {isGroupMember && (
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
          {isGroupOwner && (
            <TouchableOpacity onPress={() => onPress(3)} style={[styles.btn]}>
              <SvgUri
                width="20"
                height="20"
                style={styles.svg}
                source={require("./../../assets/group/coolicon-1.svg")}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {!isGroupMember && (
        <View style={styles.adminContainer}>
          <Image source={image} style={styles.image} />
          <Text numberOfLines={1} style={styles.text}>
            {user?.first_name} {user?.last_name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    height: 44,
    borderRadius: 10,
  },
  adminContainer: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    height: 44,
  },
  btn: {
    marginHorizontal: 20,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GroupNav;
