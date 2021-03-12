import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav } from "../../components/nav";

import GroupRequestCard from "../../components/admin/GroupRequestCard";

const listings = [
  {
    id: 1,
    name: "Red jacket for sale",
    university: { name: "Tecnologico de Monterrey" },
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    address: {
      lat: 1,
      lng: 2,
      street: "Monterrey, N.L. Mexico",
    },
    createdBy: {
      name: "Enmanuel Alejandro De Oleo",
    },
  },
];

function GroupsValidationScreen() {
  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/avatar-3.png")} />
      <Title>Validate Groups</Title>
      <ScrollView style={styles.mainScreen}>
        <FlatList
          style={{ flex: 1, overflow: "visible" }}
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item, index }) => <GroupRequestCard {...item} />}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
    overflow: "visible",
  },
  mainScreen: {
    flex: 1,
    zIndex: -1,
    width: "100%",
  },
  buttonContainer: {
    width: "70%",
  },
});

export default GroupsValidationScreen;
