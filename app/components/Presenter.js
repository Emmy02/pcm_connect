import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import colors from "../config/colors";

function Presenter({ image_src, title, description, controls, reverse }) {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: reverse ? "row-reverse" : "row" },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image_src }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.controls}>{controls}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
  },
  description: {
    textAlign: "center",
    color: colors.medium,
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: 130,
  },
  imageContainer: {
    width: "40%",
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 25,
    width: "60%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 7,
  },
  controls: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Presenter;
