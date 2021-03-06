import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function Member({
  avatar,
  user: {
    email,
    user_profile: { first_name, last_name },
  },
  is_owner,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.memberContainer} onPress={onPress}>
      <View style={styles.data}>
        <Image source={avatar} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.name}>
            {first_name} {last_name}{" "}
            {is_owner && (
              <Text style={{ color: colors.primary, fontWeight: "400" }}>
                (Admin)
              </Text>
            )}
          </Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name={"chevron-right"}
        size={24}
        color={"#000"}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  memberContainer: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "visible",
    borderColor: colors.clear,
    borderWidth: 1,
  },
  data: {
    flexDirection: "row",
    width: "90%",
  },
  email: {
    color: colors.medium,
    fontWeight: "200",
  },
  name: {
    color: colors.dark,
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  text: {
    marginStart: 15,
  },
});

export default Member;
