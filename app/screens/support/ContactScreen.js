import React from "react";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import { NoGradientButton } from "./../../components/button";

import { TopNav } from "./../../components/nav";
import { color } from "react-native-reanimated";
import Title from "../../components/Title";

function ContactScreen() {
  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/avatar-3.png")} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("./../../assets/logo.png")}
          />
          <Title>About PCM</Title>
        </View>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots. Contrary to popular belief, Lorem Ipsum is not simply
          random text It has roots.Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots. Contrary to popular belief,
          Lorem Ipsum is not simply random text It has roots.
        </Text>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots. Contrary to popular belief, Lorem Ipsum is not simply
          random text It has roots.Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots. Contrary to popular belief,
          Lorem Ipsum is not simply random text It has roots.
        </Text>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots. Contrary to popular belief, Lorem Ipsum is not simply
          random text It has roots.Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots. Contrary to popular belief,
          Lorem Ipsum is not simply random text It has roots.
        </Text>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots. Contrary to popular belief, Lorem Ipsum is not simply
          random text It has roots.Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots. Contrary to popular belief,
          Lorem Ipsum is not simply random text It has roots.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <NoGradientButton title="Contact us" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    zIndex: -1,
    padding: 10,
    backgroundColor: colors.light,
  },
  logo: {
    width: 96,
    height: 68,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    marginVertical: 10,
    color: colors.medium,
  },
  scrollView: {
    zIndex: -1,
  },
  buttonContainer: {
    paddingTop: 10,
  },
});

export default ContactScreen;
