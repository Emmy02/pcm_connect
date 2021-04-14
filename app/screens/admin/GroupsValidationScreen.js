import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav } from "../../components/nav";

import GroupRequestCard from "../../components/admin/GroupRequestCard";

import groupsApi from "./../../api/groups";
import adventistEntitiesApi from "./../../api/adventistEntities";

import useApi from "./../../hooks/useApi";

import { IMLocalized } from "./../../config/IMLocalized";

import { NavBack } from "./../../components/nav";

function GroupsValidationScreen({ navigation }) {
  const getGroupsApi = useApi(groupsApi.getPendingGroups);
  const getAdventistUnionsApi = useApi(adventistEntitiesApi.getAdventistUnions);

  const onAccepted = () => {
    navigation.goBack();
  };

  const onReject = async (id) => {
    const results = await groupsApi.rejectGroup(id, { status: 2 });

    if (results.ok) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getGroupsApi.request();
    getAdventistUnionsApi.request(1);
  }, []);

  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />
      <Title>{IMLocalized("groupsValidation")}</Title>
      <ScrollView style={styles.mainScreen}>
        <FlatList
          style={{ flex: 1, overflow: "visible" }}
          data={getGroupsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item, index }) => (
            <GroupRequestCard
              {...item}
              key={index}
              adventist_unions={getAdventistUnionsApi.data}
              onAccepted={onAccepted}
              onReject={onReject}
            />
          )}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
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
