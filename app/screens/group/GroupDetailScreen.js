import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
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

const group = {
  id: 1,
  title: "Red jacket for sale",
  university: { name: "Tecnologico de Monterrey" },
  description:
    "Contrary to popular belief, Lorem Ipsum  aklsjflasd jfklads jfklajsd flkadjs lkfj adlskis not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
  members: {
    count: 24,
    avatars: [
      require("../../assets/1.jpg"),
      require("../../assets/2.jpg"),
      require("../../assets/3.jpg"),
    ],
  },
  image: require("../../assets/3.jpg"),
};

const members = [
  {
    id: 1,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-2.png"),
  },
  {
    id: 2,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-3.png"),
  },
  {
    id: 3,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-4.png"),
  },
  {
    id: 5,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-2.png"),
  },
  {
    id: 6,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-3.png"),
  },
  {
    id: 7,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-4.png"),
  },
  {
    id: 8,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-2.png"),
  },
  {
    id: 9,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-3.png"),
  },
  {
    id: 10,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../../assets/avatar-4.png"),
  },
];

const messages = [
  {
    id: 1,
    name: "Karla Vegas",
    image: require("../../assets/avatar-3.png"),
    date: "2 hours ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    id: 2,
    name: "Johana Silva",
    image: require("../../assets/avatar-4.png"),
    me: true,
    date: "1 hour ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.",
  },
  {
    id: 3,
    name: "Karla Vegas",
    image: require("../../assets/avatar-3.png"),
    date: "2 hours ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    id: 4,
    name: "Johana Silva",
    image: require("../../assets/avatar-4.png"),
    me: true,
    date: "1 hour ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.",
  },
];

function GroupDetailScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.mainScreen}>
      <Image
        source={group.image}
        style={styles.image}
        blurRadius={activeTab === 2 ? 10 : 0}
      />

      <Screen style={styles.screen}>
        <TopNavBar />
        {activeTab !== 2 && (
          <GroupNav
            containerStyles={{
              position: "absolute",
              top: 175,
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
                  source={require("../../assets/avatar-1.png")}
                />
                <Text style={styles.text}> Enmanuel Alejandro De Oleo</Text>
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
                <Info
                  title={group.title}
                  description={group.description}
                  address="Contrary to popular belief, Lorem Ipsum is not simply ran asd sdf asd fasdfdom text. It has roots. Contrary to popular belief."
                  university="Montemorelos University"
                />
                <EventCard
                  title="¡Follow Me!"
                  subtitle="The hard way"
                  description="Contrary to popular belief, Lorem Ipsum is not simply random text."
                  link="Zoom 193 -123 - 4564 Pwd: 123432"
                  peopleGoing="23"
                  date="23rd March"
                  dateTime="3:00 pm"
                  type="Public"
                />
                <EventCard
                  title="¡Follow Me!"
                  subtitle="The hard way"
                  description="Contrary to popular belief, Lorem Ipsum is not simply random text."
                  link="Zoom 193 -123 - 4564 Pwd: 123432"
                  peopleGoing="23"
                  date="23rd March"
                  dateTime="3:00 pm"
                  type="Private"
                />
              </ScrollView>
            )}

            {activeTab === 1 && (
              <Members navigation={navigation} list={members} />
            )}
            {activeTab === 3 && (
              <GroupForm address={{ lat: 1, long: 2, street: "1232132" }} />
            )}
          </View>
        )}
        {activeTab === 2 && (
          <View style={{ width: "100%", height: "100%", position: "absolute" }}>
            <Chat messages={messages} />
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
  },
  image: {
    width: "100%",
    height: 230,
    position: "absolute",
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
    paddingTop: 230,
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
