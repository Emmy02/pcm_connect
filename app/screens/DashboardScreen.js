import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import { VerticalCard, HorizontalCard } from "../components/card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import UniversityPointer from "../components/UniversityPointer";

import Title from "./../components/Title";
import { TopNav, SearchBar } from "../components/nav";

import { OutLineButton } from "./../components/button";

import SegmentControl from "./../components/SegmentControl";
import { useState } from "react/cjs/react.development";

import WelcomeBox from "./../components/WelcomeBox";
import routes from "../navigation/routes";

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
  {
    id: 3,
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
  {
    id: 4,
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

const isAMember = true;
function DashboardScreen({ navigation }) {
  const [actveTab, setActiveTab] = useState(1);

  return (
    <Screen style={styles.screen}>
      <TopNav
        image={require("../assets/avatar-3.png")}
        controls={<SearchBar />}
        navigation={navigation}
      />
      <ScrollView style={styles.mainScreen}>
        {isAMember && (
          <WelcomeBox
            fullName="Enmanuel Alejandro De Oleo"
            onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
          />
        )}
        <View style={styles.closeGroups}>
          <Title controls={<OutLineButton title="Create a Group" />}>
            Groups close to you
          </Title>
          <FlatList
            horizontal
            style={{ overflow: "visible" }}
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <VerticalCard
                title={item.title}
                description={item.decription}
                members={item.members}
                image={item.image}
                key={index}
                onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
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
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <HorizontalCard
                controls={
                  <OutLineButton
                    title="visit"
                    backgroundColor={colors.white}
                    width={100}
                    onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
                  />
                }
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
