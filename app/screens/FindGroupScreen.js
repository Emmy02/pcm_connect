import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import UniversityPointer from "../components/UniversityPointer";

import Button from "./../components/Button";

import Presenter from "./../components/Presenter";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    university: { name: "Tecnologico de Monterrey" },
    decription:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    members: {
      count: 24,
      avatars: [
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
      ],
    },
    image: require("../assets/1.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    university: { name: "Universidad Autonoma de Nuevo Leon" },
    decription:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    members: {
      count: 12,
      avatars: [
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
      ],
    },
    image: require("../assets/2.jpg"),
  },
];

function FindGroupScreen() {
  return (
    <Screen style={styles.screen}>
      <Presenter
        title="PCM Virtual Congress 2021"
        description="Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots."
        image={require("../assets/2.jpg")}
        controls={<Button title="This is a Button" onPress={() => {}} />}
      />
      <Presenter
        title="PCM Connect Submit"
        description="Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots."
        image={require("../assets/4.jpg")}
        reverse
        controls={<Button title="This is a Button" onPress={() => {}} />}
      />
      <FlatList
        horizontal
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <Card
            title={item.title}
            description={item.decription}
            members={item.members}
            image={item.image}
            key={index}
            controls={
              <UniversityPointer university={{ name: "University Pointer" }} />
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default FindGroupScreen;
