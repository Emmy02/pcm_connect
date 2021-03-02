import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import colors from "../config/colors";

function Presenter({
  image,
  title,
  description,
  controls,
  reverse,
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: reverse ? "row-reverse" : "row" },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  description: {
    textAlign: "center",
    color: colors.medium,
  },
  image: {
    borderRadius: 20,
    maxHeight: 110,
    maxWidth: 170,
    width: "100%",
  },
  imageContainer: {
    width: "40%",
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    width: "60%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 7,
  },
});

export default Presenter;
