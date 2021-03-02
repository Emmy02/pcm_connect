import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";

import Screen from "./../components/Screen";

import { Info } from "./../components/groups";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          <Info
            title={group.title}
            description={group.description}
            address="Contrary to popular belief, Lorem Ipsum is not simply ran asd sdf asd fasdfdom text. It has roots. Contrary to popular belief."
            university="Montemorelos University"
          />
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
  },
  image: {
    width: "100%",
    maxHeight: "35%",
    position: "relative",
    top: 0,
  },
  mainScreen: {},
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
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 20,
  },
});

export default GroupScreen;
