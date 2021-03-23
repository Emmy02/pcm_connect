import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import { VerticalCard, HorizontalCard } from "../components/card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import UniversityPointer from "../components/UniversityPointer";

import Title from "./../components/Title";
import { TopNav, SearchBar } from "../components/nav";

import { OutLineButton } from "./../components/button";

import SegmentControl from "./../components/SegmentControl";

import WelcomeBox from "./../components/WelcomeBox";
import routes from "../navigation/routes";

import groupsApi from "./../api/groups";

import useApi from "./../hooks/useApi";
import useLocation from "./../hooks/useLocation";

import ActivityIndicator from "./../components/ActivityIndicator";

import { IMLocalized, init } from "./../config/IMLocalized";

const isAMember = true;
function DashboardScreen({ navigation }) {
  const [actveTab, setActiveTab] = useState(1);
  const [locationLoaded, setLocationLoaded] = useState(null);
  const location = useLocation();
  const getGroupsByLocationApi = useApi(groupsApi.getGroupsByLocation);

  if (location && !locationLoaded) {
    getGroupsByLocationApi.request(location.latitude, location.longitude);
    setLocationLoaded(1);
  }

  const getGroupsApi = useApi(groupsApi.getGroups);
  useEffect(() => {
    getGroupsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={getGroupsApi.loading} />
      <TopNav controls={<SearchBar />} navigation={navigation} />
      <ScrollView style={styles.mainScreen}>
        {getGroupsApi.error && (
          <>
            <Text> Couldn't retrieve the groups.</Text>
            <OutLineButton title="Retry" onPress={getGroupsApi.request} />
          </>
        )}
        {isAMember && (
          <WelcomeBox
            fullName="Enmanuel Alejandro De Oleo"
            onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
          />
        )}
        <View style={styles.closeGroups}>
          <Title
            controls={
              <OutLineButton
                title="Create a Group"
                onPress={() => navigation.navigate(routes.CREATE_GROUP)}
              />
            }
          >
            Groups close to you
          </Title>
          <FlatList
            horizontal
            style={{ overflow: "visible" }}
            data={getGroupsByLocationApi.data}
            keyExtractor={(g) => g.id.toString()}
            renderItem={({ item }) => (
              <VerticalCard
                {...item}
                image={require("../assets/1.jpg")}
                key={item.index}
                onPress={() => navigation.navigate(routes.GROUP_DETAILS, item)}
                controls={
                  <UniversityPointer
                    university={{ name: item.university.name }}
                  />
                }
              />
            )}
          />
        </View>
        <View style={styles.mostPopularGroups}>
          <Title>Most Popular Groups</Title>
          <SegmentControl
            segments={[
              { id: 1, title: "Your Country" },
              { id: 2, title: "Around the world" },
            ]}
            onPress={(id) => setActiveTab(id)}
            active={actveTab}
          />
          <FlatList
            style={{ overflow: "visible" }}
            data={getGroupsApi.data}
            keyExtractor={(group) => group.id.toString()}
            renderItem={({ item, index }) => (
              <HorizontalCard
                controls={
                  <OutLineButton
                    title="visit"
                    backgroundColor={colors.white}
                    width={100}
                    onPress={() =>
                      navigation.navigate(routes.GROUP_DETAILS, { ...item })
                    }
                  />
                }
                {...item}
                image={require("../assets/4.jpg")}
                key={index}
                reverse={index % 2}
              />
            )}
          />
        </View>
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
  closeGroups: {
    overflow: "visible",
    height: 420,
  },
  mainScreen: {
    zIndex: -1,
  },
  goToGroupContainer: {
    height: 200,
    borderRadius: 20,
  },
});

export default DashboardScreen;
