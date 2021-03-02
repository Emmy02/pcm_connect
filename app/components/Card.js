import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import MemberCount from "./MemberCount";

function Card({ title, description, image, members, controls }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <MemberCount {...members} />
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
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 20,
    maxWidth: 220,
    maxHeight: 320,
    shadowColor: colors.dark,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  controls: {
    textAlign: "left",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
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

export default Card;
