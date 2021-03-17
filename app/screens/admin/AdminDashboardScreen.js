import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import { HorizontalCard, GradientCard } from "../../components/card";
import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav, SearchBar } from "../../components/nav";

import { OutLineButton } from "./../../components/button";
import GradientCardContent from "../../components/admin/GradientCardContent";
import routes from "../../navigation/routes";

const dashboardData = {
  users: 150,
  females: 65,
  males: 75,
  groups: 18,
  universities: 10,
};

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
        require("../../assets/1.jpg"),
        require("../../assets/2.jpg"),
        require("../../assets/3.jpg"),
      ],
    },
    image: require("../../assets/1.jpg"),
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
        require("../../assets/1.jpg"),
        require("../../assets/2.jpg"),
        require("../../assets/3.jpg"),
      ],
    },
    image: require("../../assets/2.jpg"),
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
        require("../../assets/1.jpg"),
        require("../../assets/2.jpg"),
        require("../../assets/3.jpg"),
      ],
    },
    image: require("../../assets/2.jpg"),
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
        require("../../assets/1.jpg"),
        require("../../assets/2.jpg"),
        require("../../assets/3.jpg"),
      ],
    },
    image: require("../../assets/2.jpg"),
  },
];

function AdminDashboardScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <TopNav
        image={require("../../assets/avatar-3.png")}
        navigation={navigation}
        controls={<SearchBar />}
      />
      <ScrollView style={styles.mainScreen}>
        <View style={styles.buttonContainer}>
          <OutLineButton title="Create Terrytory's Event" />
        </View>
        <View style={styles.statsCardContainer}>
          <GradientCard>
            <GradientCardContent {...dashboardData} />
          </GradientCard>
        </View>

        <View style={styles.mostPopularGroups}>
          <Title>Groups in Territory</Title>
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
                controls={
                  <OutLineButton
                    title="visit"
                    backgroundColor={colors.white}
                    width={100}
                    onPress={() => navigation.navigate(routes.GROUP_DETAILS)}
                  />
                }
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
  mainScreen: {
    zIndex: -1,
  },
  buttonContainer: {
    width: "70%",
  },
});

export default AdminDashboardScreen;
