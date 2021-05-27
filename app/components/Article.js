import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../config";

function Article({
  title,
  image_src,
  author: {
    user_profile: { first_name, last_name },
  },
  onPress,
}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image style={styles.image} source={{ uri: image_src }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.authorName}>{first_name + " " + last_name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 15,
  },
  image: {
    height: 130,
    width: 100,
    borderRadius: 7,
    resizeMode: "contain",
  },
  title: {
    fontWeight: "bold",
    marginTop: 7,
    fontSize: 18,
    color: colors.secondary,
  },
  authorName: {
    color: colors.dark,
  },
});

export default Article;
