import React, { useEffect } from "react";
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

function AdminDashboardScreen({ navigation }) {
  const getDashboardApi = useApi(adminApi.getRootDashboard);
  const getGroupsApi = useApi(groupsApi.getPendingGroups);

  useEffect(() => {
    getDashboardApi.request();
    getGroupsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <ScrollView style={styles.mainScreen}>
        {getDashboardApi.error && (
          <>
            <Text> Couldn't retrieve the stats.</Text>
            <OutLineButton title="Retry" onPress={getGroupsApi.request} />
          </>
        )}
        <View style={styles.buttonContainer}>
          <OutLineButton
            width="48%"
            title="Create Event"
            onPress={() => navigation.navigate(routes.NOTICE_FORM)}
          />
          <OutLineButton
            onPress={() => navigation.navigate(routes.GROUPS_VALIDATION)}
            width="48%"
            title={"Validate Groups(" + getGroupsApi.data.length + ")"}
          />
        </View>
        <View style={styles.statsCardContainer}>
          <GradientCard>
            <GradientCardContent {...getDashboardApi.data} />
          </GradientCard>
        </View>

        <GroupsByCountry {...getDashboardApi.data} />

        {false && (
          <View style={styles.mostPopularGroups}>
            <Title>Groups in Territory</Title>
            <FlatList
              style={{ overflow: "visible" }}
              data={[]}
              keyExtractor={(listing) => listing.id.toString()}
              renderItem={({ item, index }) => (
                <HorizontalCard
                  title={item.title}
                  description={item.decription}
                  members={item.members}
                  image={item.image}
                  key={index}
                  reverse={index % 2}
                  controls={
                    <OutLineButton
                      title="visit"
                      backgroundColor={colors.white}
                      width={100}
                      onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
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
    backgroundColor: colors.light,
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
