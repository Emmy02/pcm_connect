import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function Member({ name, email, image, onPress }) {
  return (
    <View>
      <TouchableOpacity style={styles.memberContainer} onPress={onPress}>
        <View style={styles.data}>
          <Image source={image} style={styles.image} />
          <View style={styles.text}>
            <Text style={styles.name}>{name}</Text>
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
    </View>
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
