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
  Members,
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

function GroupDetailScreen({ navigation, route }) {
  const defaultImage = require("../../assets/1.jpg");
  const { id } = route.params;

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
      <TopNavBar onBack={() => navigation.goBack()} />
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
                <FlatList
                  style={{ flex: 1 }}
                  data={getEventsApi.data}
                  keyExtractor={(event) => event.id.toString()}
                  renderItem={({ item, index }) => <EventCard {...item} />}
                />
              </ScrollView>
            )}

            {activeTab === 1 && (
              <Members navigation={navigation} list={getMembersApi.data} />
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
