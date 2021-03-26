import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

import Screen from "./../../components/Screen";
import {
  Info,
  Users,
  Chat,
  TopNavBar,
  GroupNav,
  GroupForm,
} from "./../../components/groups";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

import { EventCard } from "./../../components/card";
import groupsApi from "./../../api/groups";
import eventsApi from "./../../api/events";
import messagesApi from "../../api/messages";
import membersApi from "./../../api/members";
import requestsApi from "./../../api/requests";

import useApi from "./../../hooks/useApi";
import { IMLocalized } from "./../../config/IMLocalized";
import Title from "./../../components/Title";

import useAccount from "./../../account/useAccount";
import { NoGradientButton, OutLineButton } from "../../components/button";

import { getRecordId } from "./../../utility/utils";

import routes from "./../../navigation/routes";

function GroupDetailScreen({ navigation, route }) {
  const { id } = route.params;

  const { getRoles, profile } = useAccount();
  const { roles, resources } = getRoles(profile.roles);

  const isCurrentGroupMember = roles.isMember && resources.memberGroupId === id;
  const isCurrentGroupOwner = roles.isOwner && resources.ownerGroupId === id;

  const defaultImage = require("../../assets/1.jpg");
  const baseUrl = "https://pcm-api.herokuapp.com";

  const getGroupApi = useApi(groupsApi.getGroup);
  const getEventsApi = useApi(eventsApi.getEvents);
  const getMembersApi = useApi(membersApi.getMembers);
  const getMessagesApi = useApi(messagesApi.getMessages);
  const getRequestsApi = useApi(requestsApi.getRequests);

  useEffect(() => {
    getGroupApi.request(id);
    getEventsApi.request(id);
    getMembersApi.request(id);
    getMessagesApi.request(id);
    getRequestsApi.request(id);
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const participate = async (groupId, eventId, userId) => {
    const params = {
      status: 0,
      user_id: userId,
      activity_type: "Event",
      activity_id: eventId,
    };

    const result = await eventsApi.addAttendant(params);

    if (result.ok) getEventsApi.request(groupId);
  };

  const notParticipate = async (attendant) => {
    const result = await eventsApi.destroyAttendant(attendant);

    if (result.ok) getEventsApi.request(id);
  };

  return (
    <View style={styles.mainScreen}>
      <Image
        source={
          getGroupApi.data.image
            ? { uri: getGroupApi.data.image }
            : defaultImage
        }
        style={styles.image}
        blurRadius={activeTab === 2 ? 10 : 0}
      />
      <TopNavBar isMember={roles.isMember} onBack={() => navigation.goBack()} />
      <Screen style={styles.screen}>
        {activeTab !== 2 && (
          <GroupNav
            containerStyles={{
              position: "absolute",
              top: -30,
              left: 10,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 10,
            }}
            index={activeTab}
            onPress={(index) => setActiveTab(index)}
            image={
              profile.avatar
                ? { uri: baseUrl + profile.avatar }
                : require("./../../assets/user.png")
            }
            user={getGroupApi.data.user}
            isGroupMember={isCurrentGroupMember}
            isGroupOwner={isCurrentGroupOwner}
          />
        )}
        {activeTab !== 2 && (
          <View style={styles.tabs}>
            {false && (
              <View style={styles.leaderContainer}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/1.jpg")}
                />
                <Text style={styles.text}>
                  {" "}
                  {getGroupApi.data.user.first_name +
                    " " +
                    getGroupApi.data.user.last_name}
                </Text>
                <MaterialCommunityIcons
                  name={"dots-horizontal"}
                  size={24}
                  color={"#fff"}
                  style={styles.icon}
                />
              </View>
            )}
            {activeTab === 0 && (
              <ScrollView>
                <Info {...getGroupApi.data} />
                <Title
                  controls={
                    isCurrentGroupOwner && (
                      <OutLineButton
                        title={IMLocalized("createEventButton")}
                        onPress={() =>
                          navigation.navigate(routes.CREATE_GROUP_EVENT)
                        }
                      />
                    )
                  }
                >
                  {IMLocalized("events")}
                </Title>
                <FlatList
                  style={{ flex: 1 }}
                  data={getEventsApi.data}
                  keyExtractor={(event) => event.id.toString()}
                  renderItem={({ item, index }) => (
                    <EventCard
                      {...item}
                      controls={
                        <View style={{ paddingTop: 5 }}>
                          {!item.attendants.some(
                            (attendant) => attendant.user_id === profile.id
                          ) && (
                            <NoGradientButton
                              title={IMLocalized("participate")}
                              color="primary"
                              onPress={() =>
                                participate(id, item.id, profile.id)
                              }
                            />
                          )}
                          {item.attendants.some(
                            (attendant) => attendant.user_id === profile.id
                          ) && (
                            <NoGradientButton
                              title={IMLocalized("notParticipate")}
                              color="danger"
                              onPress={() =>
                                notParticipate(
                                  getRecordId(
                                    profile.id,
                                    "user_id",
                                    item.attendants
                                  )
                                )
                              }
                            />
                          )}
                        </View>
                      }
                    />
                  )}
                />
              </ScrollView>
            )}

            {activeTab === 1 && (
              <View>
                {getRequestsApi.data.length > 0 && (
                  <Users
                    title={IMLocalized("requests")}
                    navigation={navigation}
                    list={getRequestsApi.data}
                    groupId={id}
                  />
                )}
                <Users
                  title={IMLocalized("members")}
                  navigation={navigation}
                  list={getMembersApi.data}
                  groupId={id}
                />
              </View>
            )}
            {activeTab === 3 && (
              <GroupForm address={{ lat: 1, long: 2, street: "1232132" }} />
            )}
          </View>
        )}
        {activeTab === 2 && (
          <View style={{ width: "100%", height: "100%", position: "absolute" }}>
            <Chat messages={getMessagesApi.data} />
            <GroupNav
              containerStyles={styles.bottomNav}
              index={activeTab}
              onPress={(index) => setActiveTab(index)}
              isGroupMember={isCurrentGroupMember}
              isGroupOwner={isCurrentGroupOwner}
            />
          </View>
        )}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  screen: {
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: 230,
  },
  leaderContainer: {
    backgroundColor: "rgba(130, 77, 144, 0.8)",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    height: 60,
    position: "absolute",
    top: -30,
    left: 20,
    zIndex: 999,
  },
  tabs: {
    marginTop: 40,
    overflow: "visible",
    zIndex: -1,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 20,
  },
  mainScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default GroupDetailScreen;
