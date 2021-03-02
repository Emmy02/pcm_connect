import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";

import Screen from "./../components/Screen";

import { Info, Members, Chat } from "./../components/groups";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const group = {
  id: 1,
  title: "Red jacket for sale",
  university: { name: "Tecnologico de Monterrey" },
  description:
    "Contrary to popular belief, Lorem Ipsum  aklsjflasd jfklads jfklajsd flkadjs lkfj adlskis not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
  members: {
    count: 24,
    avatars: [
      require("../assets/1.jpg"),
      require("../assets/2.jpg"),
      require("../assets/3.jpg"),
    ],
  },
  image: require("../assets/3.jpg"),
};

const members = [
  {
    id: 1,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-2.png"),
  },
  {
    id: 2,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-3.png"),
  },
  {
    id: 3,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-4.png"),
  },
  {
    id: 5,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-2.png"),
  },
  {
    id: 6,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-3.png"),
  },
  {
    id: 7,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-4.png"),
  },
  {
    id: 8,
    name: "Nahomi Rivas",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-2.png"),
  },
  {
    id: 9,
    name: "Karla Vega",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-3.png"),
  },
  {
    id: 10,
    name: "Johana Silva",
    email: "nahomi@pcm.com",
    image: require("../assets/avatar-4.png"),
  },
];

const messages = [
  {
    id: 1,
    name: "Karla Vegas",
    image: require("../assets/avatar-3.png"),
    date: "2 hours ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    id: 2,
    name: "Johana Silva",
    image: require("../assets/avatar-4.png"),
    me: true,
    date: "1 hour ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.",
  },
  {
    id: 3,
    name: "Karla Vegas",
    image: require("../assets/avatar-3.png"),
    date: "2 hours ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    id: 4,
    name: "Johana Silva",
    image: require("../assets/avatar-4.png"),
    me: true,
    date: "1 hour ago",
    content:
      "It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.",
  },
];

function GroupScreen() {
  return (
    <View style={styles.mainScreen}>
      <Image source={group.image} style={styles.image} />
      <Screen style={styles.screen}>
        <View style={styles.leaderContainer}>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar-1.png")}
          />
          <Text style={styles.text}> Enmanuel Alejandro De Oleo</Text>
          <MaterialCommunityIcons
            name={"dots-horizontal"}
            size={24}
            color={"#fff"}
            style={styles.icon}
          />
        </View>
        <View style={styles.tabs}>
          {/*<Info
            title={group.title}
            description={group.description}
            address="Contrary to popular belief, Lorem Ipsum is not simply ran asd sdf asd fasdfdom text. It has roots. Contrary to popular belief."
            university="Montemorelos University"
          />*/}
          {/* <Members list={members} /> */}
          <Chat messages={messages} />
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  screen: {
    padding: 20,
    overflow: "visible",
  },
  image: {
    width: "100%",
    maxHeight: "35%",
    position: "relative",
    top: 0,
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
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 20,
  },
  mainScreen: {
    backgroundColor: colors.light,
    overflow: "visible",
    flex: 1,
  },
});

export default GroupScreen;
