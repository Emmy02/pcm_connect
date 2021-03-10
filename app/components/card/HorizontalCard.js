import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "../Text";
import { colors, defaultStyles } from "../../config";

function HorizontalCard({
  title,
  description,
  image,
  members,
  reverse,
  controls,
}) {
  return (
    <View
      style={[styles.card, { flexDirection: reverse ? "row-reverse" : "row" }]}
    >
      <Image
        style={[
          styles.image,
          {
            borderTopLeftRadius: reverse ? 0 : 20,
            borderBottomLeftRadius: reverse ? 0 : 20,
            borderTopRightRadius: reverse ? 20 : 0,
            borderBottomRightRadius: reverse ? 20 : 0,
          },
        ]}
        source={image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.controls}>{controls}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    marginVertical: 10,
    overflow: "visible",
    borderWidth: 1,
    borderColor: colors.clear,
  },
  controls: {
    textAlign: "left",
  },
  detailsContainer: {
    padding: 20,
    width: "50%",
  },
  image: {
    width: 180,
    height: 150,
  },
  description: {
    color: colors.medium,
    fontWeight: "100",
    fontSize: 12,
  },
  title: {
    marginBottom: 7,
    color: colors.secondary,
    fontWeight: "600",
  },
});

export default HorizontalCard;
