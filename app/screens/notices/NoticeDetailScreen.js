import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IMLocalized } from "./../../config/IMLocalized";

const notice = {
  id: 1,
  title: "PCM Virtual Congress 2021",
  description:
    "Contrary to popular belief,Lorem Ipsum is not simply random text. It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots. Contrary to popular belief, Lorem Ipsum is not simply random text It has roots.",
  link: "Zoom 193 -123 - 4564 Pwd: 123432",
  peopleGoing: "60",
  date: "23rd March",
  dateTime: "3:00 pm",
  image: require("../../assets/2.jpg"),
  onPress: () => {},
};

function NoticeDetailScreen({ navigation }) {
  return (
    <View style={styles.mainScreen}>
      <Image source={notice.image} style={styles.image} />
      <Screen style={styles.screen}>
        <Title>{notice.title}</Title>
        <Text style={styles.description} numberOfLines={4}>
          {notice.description}
        </Text>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"link-variant"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{notice.link}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"clock-time-five-outline"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{notice.dateTime}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"calendar"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{notice.date}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"account-group-outline"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>
            {notice.peopleGoing} {IMLocalized("peopleGoing")}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <NoGradientButton title={IMLocalized("participate")} />
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  screen: {
    padding: 10,
  },
  image: {
    height: "30%",
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 10,
    width: "100%",
  },
  description: {
    paddingBottom: 10,
    color: colors.medium,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    paddingRight: 10,
  },
});

export default NoticeDetailScreen;
