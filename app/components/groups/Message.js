import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function Message({
  user_first_name,
  content,
  avatar,
  created_at,
  me,
  onPress,
}) {
  dayjs.extend(relativeTime);

  return (
    <View
      style={[
        styles.messageContainer,
        { flexDirection: me ? "row-reverse" : "row" },
      ]}
    >
      <Image source={avatar} style={styles.image} />
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
          <Text style={styles.name}>{user_first_name.split(" ")[0]}</Text>
          <Text style={styles.date}>{dayjs(created_at).fromNow()}</Text>
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
  },
  contentContainer: {},
  content: {
    color: colors.black,
  },
  date: {
    color: colors.medium,
    fontSize: 12,
    marginHorizontal: 10,
  },
});

export default Message;
