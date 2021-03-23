import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import Text from "../Text";
import MemberCount from "../MemberCount";

import { colors, defaultStyles } from "../../config";

function VerticalCard({
  name,
  description,
  image,
  members,
  lat,
  lng,
  address,
  members_count,
  university,
  user,
  controls,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        {members && <MemberCount {...members} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
          <View style={styles.controls}>{controls}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 20,
    width: 250,
    maxHeight: 300,
    marginHorizontal: 10,
    ...defaultStyles.shadows,
  },
  controls: {
    textAlign: "left",
    width: "100%",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

export default VerticalCard;
