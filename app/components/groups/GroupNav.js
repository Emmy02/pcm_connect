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
  index,
}) {
  const getSizeIfActive = (activated) => {
    return activated === index
      ? {
          borderBottomWidth: 2,
          borderColor: colors.white,
          paddingBottom: 5,
        }
      : {};
  };
  return (
    <View style={containerStyles}>
      {isGroupMember && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => onPress(0)} style={[styles.btn]}>
            <SvgUri
              width={24}
              height={24}
              style={[styles.svg, getSizeIfActive(0)]}
              source={require("./../../assets/group/home.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(1)} style={[styles.btn]}>
            <SvgUri
              width={24}
              height={24}
              style={[styles.svg, getSizeIfActive(1)]}
              source={require("./../../assets/group/user.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(2)} style={[styles.btn]}>
            <SvgUri
              width={24}
              height={24}
              style={[styles.svg, getSizeIfActive(2)]}
              source={require("./../../assets/group/chat.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(4)} style={[styles.btn]}>
            <SvgUri
              width={24}
              height={24}
              style={[styles.svg, getSizeIfActive(4)]}
              source={require("./../../assets/group/network.svg")}
            />
          </TouchableOpacity>
          {isGroupOwner && (
            <TouchableOpacity onPress={() => onPress(3)} style={[styles.btn]}>
              <SvgUri
                width={24}
                height={24}
                style={[styles.svg, getSizeIfActive(3)]}
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
    width: "94%",
    backgroundColor: "rgba(0,0,0,.5 )",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    height: 44,
    borderRadius: 10,
    top: -22,
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
    top: -22,
  },
  btn: {
    paddingHorizontal: 20,
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
