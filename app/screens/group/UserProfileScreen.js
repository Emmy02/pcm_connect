import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import Screen from "./../../components/Screen";

import dayjs from "dayjs";

import { NavBack } from "./../../components/nav";

import colors from "../../config/colors";

import { LinearGradient } from "expo-linear-gradient";

import SvgUri from "react-native-svg-uri";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";

import { IMLocalized } from "./../../config/IMLocalized";

function UserProfileScreen({ navigation, route }) {
  const {
    avatar,
    email,
    id,
    user_profile: {
      age,
      career_name,
      cover,
      gender,
      first_name,
      last_name,
      is_adventist,
      created_at,
    },
  } = route.params;

  return (
    <View style={styles.mainScreen}>
      <Image
        source={require("../../assets/3.jpg")}
        style={styles.image}
        blurRadius={10}
      />

      <Screen style={styles.screen}>
        <View style={styles.backButtonContainer}>
          <NavBack onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.card}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            locations={[1, 0]}
            end={{ x: 1, y: 1 }}
            colors={[colors.primary, colors.secondary]}
            style={styles.gradient}
          >
            <View style={styles.userInfoContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateWraper}>
                  <Text style={styles.date}>
                    {dayjs(created_at).format("ddd, MMM D, YYYY h:mm A")}
                  </Text>
                </View>
              </View>
              <View style={styles.primaryInfoContainer}>
                <Image style={styles.avatar} source={avatar} />
                <View style={styles.primaryInfo}>
                  <Text style={[styles.fullName, styles.text]}>
                    {first_name} {last_name}
                  </Text>
                  <Text style={[styles.email, styles.text]}>{email}</Text>
                  <Text numberOfLines={3} style={[styles.cover, styles.text]}>
                    {cover}
                  </Text>
                </View>
              </View>
              <View style={styles.secondaryInfo}>
                <View style={[styles.centered, styles.ageContainer]}>
                  <Text style={[styles.age, styles.text]}>{age}</Text>
                  <Text style={styles.text}>{IMLocalized("yearsOld")}</Text>
                </View>
                <View style={[styles.centered, styles.adventistContainer]}>
                  <Text style={[styles.adventist, styles.text]}>
                    {is_adventist ? "adventist" : "non-adventist"}
                  </Text>
                </View>
                <View style={[styles.centered, styles.careerContainer]}>
                  <Text style={[styles.career, styles.text]}>
                    {career_name}
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
              source={require("./../../assets/quotes.svg")}
            />
            <View>
              <Text style={styles.message}>{""}</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <Title>{IMLocalized("adminActions")}</Title>
            <View style={styles.firstRow}>
              <View style={{ width: "48%" }}>
                <NoGradientButton
                  title={IMLocalized("remove")}
                  color="danger"
                />
              </View>
              <View style={{ width: "48%" }}>
                <NoGradientButton title={IMLocalized("report")} color="clear" />
              </View>
            </View>
            <View style={styles.lastRow}>
              <NoGradientButton
                title={IMLocalized("makeAdmin")}
                color="primary"
              />
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
    height: 100,
    textAlign: "center",
  },
  backButtonContainer: {
    padding: 10,
  },
});

export default UserProfileScreen;
