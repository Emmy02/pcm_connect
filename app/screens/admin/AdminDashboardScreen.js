import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import { HorizontalCard, GradientCard } from "../../components/card";
import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav } from "../../components/nav";

import { OutLineButton } from "./../../components/button";
import GradientCardContent from "../../components/admin/GradientCardContent";
import GroupsByCountry from "./../../components/admin/GroupsByCountry";
import routes from "../../navigation/routes";

import adminApi from "./../../api/admin";
import groupsApi from "./../../api/groups";
import useApi from "./../../hooks/useApi";
import { IMLocalized } from "./../../config/IMLocalized";

import useAccount from "./../../account/useAccount";
import groupSubscriptionApi from "./../../api/groupSubscriptions";

function AdminDashboardScreen({ navigation }) {
  const [stats, setStats] = useState({});
  const [directorGroups, setDirectorGroups] = useState([]);

  const { profile, getRoles } = useAccount();
  const { roles, resources } = getRoles(profile.roles);

  const isAdmin = roles.isAdmin;
  const isDirector = roles.isDirector;

  const getAdminDashBoard = async () => {
    const results = await adminApi.getRootDashboard();

    if (results.ok) {
      setStats(results.data);
    }
  };

  const getDirectorDashboard = async () => {
    const results = await adminApi.getDirectorDashboard();

    if (results.ok) {
      setStats(results.data);
    }
  };

  const getDirectorGroups = async () => {
    const results = await adminApi.getDirectorGroups();

    if (results.ok) {
      setDirectorGroups(results.data);
    }
  };

  const getSubscriptions = async () => {
    const results = await groupSubscriptionApi.getGroupSubscriptions();
    if (results.ok) {
      setSubscriptions(results.data);
    }
  };

  const getGroupsApi = useApi(groupsApi.getPendingGroups);

  useEffect(() => {
    if (isDirector) {
      getDirectorDashboard();
      getDirectorGroups();
    }

    if (isAdmin) {
      getAdminDashBoard();
      getGroupsApi.request();
    }
  }, []);

  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <ScrollView style={styles.mainScreen}>
        <View style={styles.buttonContainer}>
          <OutLineButton
            width="48%"
            title="Create Event"
            onPress={() =>
              navigation.navigate(routes.NOTICE_FORM, { userId: profile.id })
            }
          />
          <OutLineButton
            onPress={() => navigation.navigate(routes.GROUPS_VALIDATION)}
            width="48%"
            title={"Validate Groups(" + getGroupsApi.data.length + ")"}
          />
        </View>
        <View style={styles.statsCardContainer}>
          <GradientCard>
            <GradientCardContent {...stats} />
          </GradientCard>
        </View>

        <GroupsByCountry {...stats} />

        {isDirector && (
          <View style={styles.mostPopularGroups}>
            <Title>{IMLocalized("groupsInTerritory")}</Title>
            <FlatList
              horizontal
              style={{ overflow: "visible" }}
              data={directorGroups}
              keyExtractor={(g) => g.id.toString()}
              renderItem={({ item }) => (
                <VerticalCard
                  {...item}
                  image={require("../../assets/3.jpg")}
                  key={item.index}
                  controls={
                    <OutLineButton
                      title={IMLocalized("visitButton")}
                      backgroundColor={colors.white}
                      width={100}
                      onPress={() =>
                        navigation.navigate(routes.GROUP_DETAILS, {
                          ...item,
                          getSubscriptions,
                        })
                      }
                    />
                  }
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
    overflow: "visible",
  },
  mainScreen: {
    zIndex: -1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AdminDashboardScreen;
