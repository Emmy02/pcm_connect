import React, { useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Presenter from "./../../components/Presenter";
import Title from "./../../components/Title";
import Seed from "./../../components/Seed";

import { OutLineButton } from "./../../components/button";

import { TopNav } from "./../../components/nav";
import routes from "../../navigation/routes";

const presenters = [
  {
    id: 1,
    title: "PCM Virtual Congress 2021",
    description:
      "Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots.",
    image: require("../../assets/2.jpg"),
    onPress: () => {},
  },
  {
    id: 2,
    title: "PCM Virtual Congress 2021",
    description:
      "Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots.",
    image: require("../../assets/1.jpg"),
    onPress: () => {},
  },
  {
    id: 3,
    title: "PCM Virtual Congress 2021",
    description:
      "Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots.",
    image: require("../../assets/3.jpg"),
    onPress: () => {},
  },
];

const seeds = [
  { id: 1, title: "DIA" },
  { id: 2, title: "North Mexican Conference" },
  { id: 3, title: "Northen Adventist Association" },
];

function NoticesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState(1);
  return (
    <Screen style={styles.screen}>
      <TopNav
        image={require("../../assets/avatar-3.png")}
        navigation={navigation}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.filterList}>
          <Title>Notices</Title>
          <FlatList
            style={{ overflow: "visible" }}
            data={seeds}
            horizontal
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <Seed
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                active={activeFilter === item.id}
                {...item}
                key={"notice-seed-" + index}
              />
            )}
          />
        </View>
        <View style={styles.noticesList}>
          <FlatList
            data={presenters}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <Presenter
                reverse={index % 2}
                {...item}
                key={"notice-presenter-" + index}
                controls={
                  <OutLineButton
                    title="See Details"
                    onPress={() => navigation.navigate(routes.NOTICE_DETAILS)}
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
  },
  scrollView: {
    zIndex: -1,
  },
  filterList: {
    marginBottom: 30,
    overflow: "visible",
    zIndex: -1,
  },
  noticesList: {
    zIndex: -1,
  },
});

export default NoticesScreen;
