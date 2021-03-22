import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GroupInfo({ name, description, address, university }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
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
        <Text style={styles.text}>{university?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginVertical: 10,
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
