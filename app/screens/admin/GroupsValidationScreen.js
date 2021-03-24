import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav } from "../../components/nav";

import GroupRequestCard from "../../components/admin/GroupRequestCard";

import groupsApi from "./../../api/groups";
import useApi from "./../../hooks/useApi";

function GroupsValidationScreen({ navigation }) {
  const getGroupsApi = useApi(groupsApi.getPendingGroups);

  useEffect(() => {
    getGroupsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <Title>Validate Groups</Title>
      <ScrollView style={styles.mainScreen}>
        <FlatList
          style={{ flex: 1, overflow: "visible" }}
          data={getGroupsApi.data}
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
    zIndex: -1,
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
