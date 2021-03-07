import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";

import Screen from "./../components/Screen";

import { TopNavBar } from "./../components/groups";
import colors from "../config/colors";

import { LinearGradient } from "expo-linear-gradient";

import SvgUri from "react-native-svg-uri";

import Title from "./../components/Title";
import { NoGradientButton } from "./../components/button";

const member = {
  groupImage: require("../assets/3.jpg"),
  avatar: require("../assets/avatar-1.png"),
  fullName: "Nahomi Rivas",
  date: "Tuesday 23rd , March 2021",
  email: "nahomi@pcm.com",
  cover:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots. Contrary to popular belief",
  age: 24,
  adventist: true,
  career: "Computer Engeenering Student",
  message:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. t has roots. Contrary to popular belief Contrary to popular belief, Lorem Ipsum is not simply random text. t has roots. Contrary to popular belief",
};

function UserProfileScreen() {
  return (
    <View style={styles.mainScreen}>
      <Image source={member.groupImage} style={styles.image} blurRadius={10} />

      <Screen style={styles.screen}>
        <View style={styles.card}>
          <LinearGradient
            start={{ x: 0, y: 0.2 }}
            locations={[1, 0.1]}
            end={{ x: 2, y: 1.5 }}
            colors={[colors.danger, colors.secondary]}
            style={styles.gradient}
          >
            <View style={styles.userInfoContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateWraper}>
                  <Text style={styles.date}>{member.date}</Text>
                </View>
              </View>
              <View style={styles.primaryInfoContainer}>
                <Image style={styles.avatar} source={member.avatar} />
                <View style={styles.primaryInfo}>
                  <Text style={[styles.fullName, styles.text]}>
                    {member.fullName}
                  </Text>
                  <Text style={[styles.email, styles.text]}>
                    {member.email}
                  </Text>
                  <Text numberOfLines={3} style={[styles.cover, styles.text]}>
                    {member.cover}
                  </Text>
                </View>
              </View>
              <View style={styles.secondaryInfo}>
                <View style={[styles.centered, styles.ageContainer]}>
                  <Text style={[styles.age, styles.text]}>{member.age}</Text>
                  <Text style={styles.text}>Years Old</Text>
                </View>
                <View style={[styles.centered, styles.adventistContainer]}>
                  <Text style={[styles.adventist, styles.text]}>
                    {member.adventist ? "adventist" : "non-adventist"}
                  </Text>
                </View>
                <View style={[styles.centered, styles.careerContainer]}>
                  <Text style={[styles.career, styles.text]}>
                    {member.career}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.secondaryDataContainer}>
          <View style={styles.messageContainer}>
            <SvgUri
              width="100"
              height="100"
              style={styles.svg}
              source={require("./../assets/quotes.svg")}
            />
            <View>
              <Text style={styles.message}>{member.message}</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <Title>Admin Actions</Title>
            <View style={styles.firstRow}>
              <View style={{ width: "48%" }}>
                <NoGradientButton title="remove" color="danger" />
              </View>
              <View style={{ width: "48%" }}>
                <NoGradientButton title="report" color="clear" />
              </View>
            </View>
            <View style={styles.lastRow}>
              <NoGradientButton title="Make Admin" color="primary" />
            </View>
          </View>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    overflow: "visible",
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
  image: {
    width: "100%",
    maxHeight: "35%",
    position: "relative",
    top: 0,
  },
  mainScreen: {
    height: "100%",
  },
  card: {
    width: "100%",
    borderRadius: 30,
  },
  centered: {
    alignItems: "center",
  },
  gradient: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%",
  },
  dateContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  dateWraper: {
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,.5)",
    width: "60%",
  },
  date: {
    width: "100%",
    padding: 7,
    textAlign: "center",
    color: colors.white,
  },
  primaryInfoContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  primaryInfo: {
    paddingHorizontal: 10,
    width: "100%",
  },
  text: {
    color: colors.white,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 3,
  },
  email: {
    paddingBottom: 5,
  },
  cover: {
    width: "70%",
  },
  secondaryInfo: {
    flexDirection: "row",
    marginVertical: 30,
    width: "100%",
  },
  age: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  adventist: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  career: {
    textAlign: "center",
  },
  ageContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  adventistContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  careerContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryDataContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  message: {
    textAlign: "center",
  },
});

export default UserProfileScreen;
