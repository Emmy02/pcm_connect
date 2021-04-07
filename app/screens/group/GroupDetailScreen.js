import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  Alert,
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
import colors from "../../config/colors";

import { EventCard } from "./../../components/card";
import groupsApi from "./../../api/groups";
import eventsApi from "./../../api/events";
import messagesApi from "../../api/messages";
import membersApi from "./../../api/members";
import requestsApi from "./../../api/requests";
import groupsSubscriptionApi from "./../../api/groupSubscriptions";
import accountApi from "./../../api/account";

import useApi from "./../../hooks/useApi";
import { IMLocalized } from "./../../config/IMLocalized";
import Title from "./../../components/Title";

import useAccount from "./../../account/useAccount";
import { NoGradientButton, OutLineButton } from "../../components/button";

import { getRecordId } from "./../../utility/utils";

import routes from "./../../navigation/routes";

function GroupDetailScreen({ navigation, route }) {
  const [updated, setUpdated] = useState(null);

  const { id, getSubscriptions } = route.params;

  const { getRoles, profile, setProfile } = useAccount();
  const { roles, resources } = getRoles(profile.roles);

  const isCurrentGroupMember = roles.isMember && resources.memberGroupId === id;
  const isCurrentGroupOwner = roles.isOwner && resources.ownerGroupId === id;
  const isCurrentGroupRequested =
    roles.isRequested && resources.requestedGroupId === id;
  const isDefaultUser = roles.isDefaultUser;

  let subscriptionId = null;
  let isSubscribed = false;

  if (profile.subscriptions)
    profile.subscriptions.map((sub) => {
      if (sub.group_id === id) {
        isSubscribed = true;
        subscriptionId = sub.id;
      }
    });

  const defaultImage = require("../../assets/3.jpg");
  const baseUrl = "https://pcm-api.herokuapp.com";

  const getGroupApi = useApi(groupsApi.getGroup);
  const getEventsApi = useApi(eventsApi.getEvents);
  const getPublicEventsApi = useApi(eventsApi.getPublicEvents);
  const getMembersApi = useApi(membersApi.getMembers);
  const getMessagesApi = useApi(messagesApi.getMessages);
  const getRequestsApi = useApi(requestsApi.getRequests);

  const getProfile = async () => {
    const result = await accountApi.getProfile();
    if (result.ok) setProfile(result.data);
  };

  useEffect(() => {
    getGroupApi.request(id);

    if (isDefaultUser) {
      getPublicEventsApi.request(id);
    } else {
      getEventsApi.request(id);
      getMembersApi.request(id);
      getMessagesApi.request(id);
      getRequestsApi.request(id);
    }
  }, [updated]);

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

  const onSubscribe = async (groupId) => {
    Alert.alert(
      IMLocalized("subscription"),
      IMLocalized("subscription_details"),
      [
        {
          text: IMLocalized("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: IMLocalized("accept"),
          onPress: async () => {
            const result = await groupsSubscriptionApi.addGroupSubscription(
              groupId
            );
            if (result.ok) {
              getSubscriptions();
              getProfile();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onUnSubscribe = async (subscriptionId) => {
    Alert.alert(
      IMLocalized("Alert"),
      IMLocalized("areYouSure"),
      [
        {
          text: IMLocalized("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: IMLocalized("accept"),
          onPress: async () => {
            const result = await groupsSubscriptionApi.destroyGroupSubscription(
              subscriptionId
            );
            if (result.ok) {
              getSubscriptions();
              getProfile();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onCancelJoin = async () => {
    Alert.alert(
      IMLocalized("Alert"),
      IMLocalized("areYouSure"),
      [
        {
          text: IMLocalized("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: IMLocalized("accept"),
          onPress: async () => {
            const result = await accountApi.cancelRequest({ status: 2 });
            if (result.ok) getProfile();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onLeave = async () => {
    let memberId = null;

    getMembersApi.data.map((m) => {
      if (m.user.id === profile.id) memberId = m.id;
    });

    if (memberId) {
      Alert.alert(
        IMLocalized("Alert"),
        IMLocalized("areYouSure"),
        [
          {
            text: IMLocalized("cancel"),
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: IMLocalized("accept"),
            onPress: async () => {
              const result = await membersApi.destroyMember(id, memberId);

              if (result.ok) {
                setUpdated(!updated);
                getProfile();
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const removeEvent = async (eventId) => {
    Alert.alert(
      IMLocalized("Alert"),
      IMLocalized("areYouSure"),
      [
        {
          text: IMLocalized("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: IMLocalized("accept"),
          onPress: async () => {
            const result = await eventsApi.destroyEvent(id, eventId);

            if (result.ok) {
              setUpdated(!updated);
            }
          },
        },
      ],
      { cancelable: false }
    );
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
      <TopNavBar
        showJoin={!roles.isMember && !roles.isRequested}
        canCancelJoin={isCurrentGroupRequested}
        cancelJoin={() => onCancelJoin(id)}
        canSubscribe={
          !isCurrentGroupMember && !isCurrentGroupOwner && !isSubscribed
        }
        onPress={() => navigation.navigate(routes.CREATE_JOIN_REQUEST, { id })}
        onSubscribe={() => onSubscribe(id)}
        onBack={() => navigation.goBack()}
        canUnSubscribe={isSubscribed}
        onUnSubscribe={() => onUnSubscribe(subscriptionId)}
        canLeave={isCurrentGroupMember && !isCurrentGroupOwner}
        onLeave={() => onLeave(id)}
      />
      <Screen style={styles.screen}>
        {activeTab !== 2 && (
          <GroupNav
            containerStyles={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 10,
              zIndex: 99999,
            }}
            index={activeTab}
            onPress={(index) => setActiveTab(index)}
            image={
              getGroupApi.data.user?.avatar
                ? { uri: baseUrl + getGroupApi.data.user.avatar }
                : require("./../../assets/user.png")
            }
            user={getGroupApi.data.user}
            isGroupMember={isCurrentGroupMember}
            isGroupOwner={isCurrentGroupOwner}
          />
        )}
        {activeTab !== 2 && (
          <View style={styles.tabs}>
            {activeTab === 0 && (
              <ScrollView>
                <Info {...getGroupApi.data} />
                <Title
                  controls={
                    isCurrentGroupOwner && (
                      <OutLineButton
                        title={IMLocalized("createEventButton")}
                        onPress={() =>
                          navigation.navigate(routes.CREATE_GROUP_EVENT, {
                            updated,
                            setUpdated,
                            groupId: id,
                            userId: profile.id,
                          })
                        }
                      />
                    )
                  }
                >
                  {IMLocalized("events")}
                </Title>
                <FlatList
                  style={{ flex: 1 }}
                  data={
                    !isCurrentGroupOwner && !isCurrentGroupMember
                      ? getPublicEventsApi.data
                      : getEventsApi.data
                  }
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
                          {isCurrentGroupOwner && (
                            <View style={{ marginTop: 7 }}>
                              <NoGradientButton
                                color="medium"
                                title={IMLocalized("remove")}
                                onPress={() => removeEvent(item.id)}
                              />
                            </View>
                          )}
                        </View>
                      }
                      setUpdated={() => setUpdated(!updated)}
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
                    setUpdated={() => setUpdated(!updated)}
                    isRequest={true}
                  />
                )}
                <Users
                  title={IMLocalized("members")}
                  navigation={navigation}
                  list={getMembersApi.data}
                  groupId={id}
                  isRequest={false}
                  setUpdated={() => setUpdated(!updated)}
                />
              </View>
            )}
            {activeTab === 3 && (
              <GroupForm
                {...getGroupApi.data}
                setUpdated={() => setUpdated(!updated)}
              />
            )}
          </View>
        )}
        {activeTab === 2 && (
          <View style={{ width: "100%", height: "100%", position: "absolute" }}>
            <Chat
              messages={getMessagesApi.data}
              groupId={id}
              userId={profile.id}
            />
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
