import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { VerticalCard, HorizontalCard } from "../components/card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import UniversityPointer from "../components/UniversityPointer";

import Title from "./../components/Title";
import { TopNav, SearchBar } from "../components/nav";

import { OutLineButton } from "./../components/button";

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
      <TopNav
        image={require("../assets/avatar-3.png")}
        controls={<SearchBar />}
      />
      <View style={styles.closeGroups}>
        <Title controls={<OutLineButton title="Create a Group" />}>
          Groups close to you
        </Title>
        <FlatList
          horizontal
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item, index }) => (
            <VerticalCard
              title={item.title}
              description={item.decription}
              members={item.members}
              image={item.image}
              key={index}
              controls={
                <UniversityPointer
                  university={{ name: "University Pointer" }}
                />
              }
            />
          )}
        />
      </View>

      <View style={styles.mostPopularGroups}>
        <Title>Most Popular Groups</Title>
        <FlatList
          style={{ overflow: "visible" }}
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item, index }) => (
            <HorizontalCard
              title={item.title}
              description={item.decription}
              members={item.members}
              image={item.image}
              key={index}
              reverse={index % 2}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  closeGroups: {
    height: 420,
    zIndex: -1,
  },
  mostPopularGroups: {
    overflow: "visible",
  },
});

export default FindGroupScreen;
