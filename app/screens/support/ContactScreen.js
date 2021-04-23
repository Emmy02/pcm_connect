import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import { NoGradientButton } from "./../../components/button";

import { TopNav } from "./../../components/nav";

import { IMLocalized } from "./../../config/IMLocalized";
import routes from "../../navigation/routes";

import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ContactScreen({ navigation }) {
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("./../../assets/pcm-logo.png")}
          />
          <Text style={{ textAlign: "center" }}>
            {IMLocalized("public_campus_ministries")}
            {IMLocalized("contact_header")}
          </Text>
        </View>
        <Text style={styles.title}>{IMLocalized("group_not_activated")}</Text>
        <Text style={styles.text}>
          {IMLocalized("group_not_activated_text")}
        </Text>
        <Text style={styles.title}>
          {IMLocalized("app_not_showing_new_features")}
        </Text>
        <Text style={styles.text}>
          {IMLocalized("app_not_showing_new_features_text")}
        </Text>
        <Text style={styles.title}>
          {IMLocalized("issues_uploading_profile")}
        </Text>
        <Text style={styles.text}>
          {IMLocalized("issues_uploading_profile_text")}
        </Text>
        <Text style={styles.title}>
          {IMLocalized("not_receiving_notifications")}
        </Text>
        <Text style={styles.text}>
          {IMLocalized("not_receiving_notifications_text")}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() =>
              _handlePressButtonAsync(
                "https://www.facebook.com/PCM-Connect-101092648436445"
              )
            }
            style={styles.list}
          >
            <MaterialCommunityIcons
              name={"facebook"}
              size={40}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.text}>PCM Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              _handlePressButtonAsync(
                "https://www.instagram.com/pcm_connect20/"
              )
            }
            style={styles.list}
          >
            <MaterialCommunityIcons
              name={"instagram"}
              size={40}
              color={colors.danger}
              style={styles.icon}
            />
            <Text style={styles.text}>PCM Connect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <NoGradientButton
          title={IMLocalized("contactUsButton")}
          onPress={() => navigation.navigate(routes.SUPPORT_TICKETS)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    zIndex: -1,
    padding: 10,
    backgroundColor: colors.background,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
    color: colors.medium,
  },
  scrollView: {
    zIndex: -1,
  },
  buttonContainer: {
    paddingTop: 10,
  },
  title: {
    fontWeight: "bold",
  },
  list: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

export default ContactScreen;
