import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function Message({ name, content, image, date, me, onPress }) {
  return (
    <View
      style={[
        styles.messageContainer,
        { flexDirection: me ? "row-reverse" : "row" },
      ]}
    >
      <Image source={image} style={styles.image} />
      <View
        style={[
          styles.bubble,
          { backgroundColor: me ? colors.light : "#E5E5E5" },
        ]}
      >
        <View
          style={[
            styles.userData,
            { flexDirection: me ? "row-reverse" : "row" },
          ]}
        >
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.content, { textAlign: me ? "right" : "left" }]}>
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  bubble: {
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    width: "70%",
  },
  userData: {
    alignItems: "center",
    paddingBottom: 7,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 10,
  },
  contentContainer: {},
  content: {
    color: colors.medium,
  },
  date: {
    color: colors.medium,
    fontSize: 12,
  },
});

export default Message;
