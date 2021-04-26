import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";

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

import accountApi from "./../api/account";
import useAccount from "./../account/useAccount";

import groupsApi from "./../api/groups";
import groupSubscriptionApi from "./../api/groupSubscriptions";
import useApi from "./../hooks/useApi";

import useLocation from "./../hooks/useLocation";
import ActivityIndicator from "./../components/ActivityIndicator";
import { IMLocalized } from "./../config/IMLocalized";

import { FindGroup } from "./../components/groups";

import authApi from "./../api/auth";
import useAuth from "./../auth/useAuth";

function DashboardScreen({ navigation }) {
  const auth = useAuth();
  const { setProfile, profile, getRoles } = useAccount();
  const { roles, resources } = getRoles(profile?.roles);

  const [actveTab, setActiveTab] = useState(1);
  const [locationLoaded, setLocationLoaded] = useState(null);
  const [isFinding, setIsFinding] = useState(false);
  const [groupsByName, setGroupsByName] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onFocus = () => {
    setIsFinding(true);
  };

  const onChangeText = (text) => {
    if (text.length === 0) return setIsFinding(false);
    setIsFinding(true);
    getGropsByName(text);
  };

  const getGropsByName = async (text) => {
    const results = await groupsApi.getGroupsByName(text);
    if (results.ok) {
      setGroupsByName(results.data);
    }
  };

  const location = useLocation();
  const getGroupsByLocationApi = useApi(groupsApi.getGroupsByLocation);

  if (location && !locationLoaded) {
    getGroupsByLocationApi.request(location.latitude, location.longitude);
    setLocationLoaded(1);
  }
  const getGroupsApi = useApi(groupsApi.getGroups);
  const getMostPopularGroupsApi = useApi(groupsApi.getMostPopularGroups);
  const getGroupSubscriptionsApi = useApi(
    groupSubscriptionApi.getGroupSubscriptions
  );

  const getSubscriptions = async () => {
    const results = await groupSubscriptionApi.getGroupSubscriptions();
    if (results.ok) {
      setSubscriptions(results.data);
    }
  };

  const getProfile = async () => {
    setRefreshing(true);
    const result = await accountApi.getProfile();
    if (result.ok) {
      setProfile(result.data);
      setRefreshing(false);
    }
  };

  const autoLogIn = async () => {
    const res = await auth.getCrendentials();
    const { email, password } = JSON.parse(res);

    const result = await authApi.login(email, password);
    if (!result.ok) return auth.logOut();

    auth.logIn(result.data);
    auth.saveCrendentials({ email, password });
    makeApiCalls();
  };

  const makeApiCalls = async () => {
    getProfile();
    getGroupsApi.request();
    getMostPopularGroupsApi.request();
    getSubscriptions();
  };

  const baseUrl = "https://pcm-api.herokuapp.com";

  useEffect(() => {
    autoLogIn();
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={getGroupsApi.loading} />
      <TopNav
        controls={<SearchBar onFocus={onFocus} onChangeText={onChangeText} />}
        navigation={navigation}
      />
      {!isFinding && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getProfile} />
          }
          style={styles.mainScreen}
        >
          {getGroupsApi.error && (
            <>
              <Text>{IMLocalized("groupsApiError")}</Text>
              <OutLineButton
                title={IMLocalized("retry")}
                onPress={getGroupsApi.request}
              />
            </>
          )}
          {(roles.isMember || roles.isRequested) && (
            <WelcomeBox
              fullName={
                profile?.user_profile.first_name +
                " " +
                profile?.user_profile.last_name
              }
              onPress={() =>
                navigation.navigate(routes.GROUP_DETAILS, {
                  id: roles.isRequested
                    ? resources.requestedGroupId
                    : resources.memberGroupId,
                })
              }
              pending={roles.isRequested}
            />
          )}
          {subscriptions.length > 0 && (
            <View style={styles.closeGroups}>
              <Title>{IMLocalized("subscribedGroups")}</Title>
              <FlatList
                horizontal
                style={{ overflow: "visible" }}
                data={subscriptions}
                keyExtractor={(g) => g.id.toString()}
                renderItem={({ item }) => (
                  <VerticalCard
                    {...item.group}
                    image={
                      item.image
                        ? { uri: baseUrl + item.image }
                        : require("../assets/3.jpg")
                    }
                    key={item.group.index}
                    controls={
                      <OutLineButton
                        title={IMLocalized("visitButton")}
                        backgroundColor={colors.white}
                        width={100}
                        onPress={() =>
                          navigation.navigate(routes.GROUP_DETAILS, {
                            ...item.group,
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
          <View style={styles.closeGroups}>
            <Title
              controls={
                roles.isDefaultUser &&
                !roles.isRequested && (
                  <OutLineButton
                    title={IMLocalized("createGroupButton")}
                    onPress={() =>
                      navigation.navigate(routes.CREATE_GROUP, {
                        userId: profile.id,
                      })
                    }
                  />
                )
              }
            >
              {IMLocalized("groupsCloseToYou")}
            </Title>
            <FlatList
              horizontal
              style={{ overflow: "visible" }}
              data={getGroupsByLocationApi.data}
              keyExtractor={(g) => g.id.toString()}
              renderItem={({ item }) => (
                <VerticalCard
                  {...item}
                  image={
                    item.image
                      ? { uri: baseUrl + item.image }
                      : require("../assets/3.jpg")
                  }
                  key={item.index}
                  onPress={() =>
                    navigation.navigate(routes.GROUP_DETAILS, {
                      ...item,
                      getSubscriptions,
                    })
                  }
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
            <Title>{IMLocalized("mostPopularGroups")}</Title>
            {false && (
              <SegmentControl
                segments={[
                  { id: 1, title: IMLocalized("yourCountry") },
                  { id: 2, title: IMLocalized("aroundTheWorld") },
                ]}
                onPress={(id) => setActiveTab(id)}
                active={actveTab}
              />
            )}
            <FlatList
              style={{ overflow: "visible" }}
              data={getMostPopularGroupsApi.data}
              keyExtractor={(group) => group.id.toString()}
              renderItem={({ item, index }) => (
                <HorizontalCard
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
                  {...item}
                  image={
                    item.image
                      ? { uri: baseUrl + item.image }
                      : require("../assets/3.jpg")
                  }
                  key={index}
                  reverse={index % 2}
                />
              )}
            />
          </View>
        </ScrollView>
      )}
      {isFinding && (
        <FindGroup
          groups={groupsByName}
          navigation={navigation}
          getSubscriptions={getSubscriptions}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
    overflow: "visible",
  },
  closeGroups: {
    overflow: "visible",
    height: 380,
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
