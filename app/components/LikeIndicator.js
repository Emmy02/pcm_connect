import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import { IMLocalized } from "./../config/IMLocalized";

function LikeIndicatorComponent({
  liked,
  addLike,
  removeLike,
  likes = [],
  names,
}) {
  return (
    <View style={styles.container}>
      {!liked && (
        <TouchableOpacity onPress={() => addLike()}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name={"thumb-up-outline"}
              size={40}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={{ paddingLeft: 10, color: colors.medium }}>
              <Text style={{ fontWeight: "bold" }}>
                {` ${names} ${IMLocalized("andOther")} `}
              </Text>
              {IMLocalized("likePeople")}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {liked && (
        <TouchableOpacity onPress={() => removeLike()}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name={"thumb-down-outline"}
              size={40}
              color={colors.danger}
              style={styles.icon}
            />
            <Text style={{ paddingLeft: 10, color: colors.medium }}>
              <Text style={{ fontWeight: "bold" }}>
                {` ${IMLocalized("you")} ${IMLocalized("andOther")} ${
                  likes.length
                } `}
              </Text>
              {IMLocalized("likePeople")}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: 100,
  },
});

export default LikeIndicatorComponent;
