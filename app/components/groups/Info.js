import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GroupInfo({ title, description, address, university, ...otherProps }) {
  return (
    <View style={styles.container} {...otherProps}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.list}>
        <MaterialCommunityIcons
          name={"map-marker-radius"}
          size={24}
          color={colors.medium}
          style={styles.icon}
        />
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={styles.list}>
        <MaterialCommunityIcons
          name={"home"}
          size={24}
          color={colors.medium}
          style={styles.icon}
        />
        <Text style={styles.text}>{university}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
  },
  title: {
    color: colors.secondary,
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
  },
  description: {
    color: colors.dark,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 22,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    paddingRight: 44,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default GroupInfo;
