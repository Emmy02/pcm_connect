import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";

import {
  Form,
  FormField,
  SubmitButton,
  FormToggle,
} from "./../../components/forms";
import { IMLocalized } from "./../../config/IMLocalized";

import { NavBack } from "./../../components/nav";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function CreacteGroupEventScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />
      <ScrollView style={styles.mainScreen}>
        <Title>{IMLocalized("createEvent")}</Title>
        <View style={styles.formContainer}>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="title"
              placeholder={IMLocalized("title")}
              textContentType="none"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="subtitle"
              placeholder={IMLocalized("subtitle")}
              textContentType="none"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="description"
              placeholder={IMLocalized("description")}
              numberOfLines={3}
              multiline
              maxLength={255}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="date"
              placeholder={IMLocalized("date")}
              textContentType="none"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="meeting-link"
              placeholder={IMLocalized("meetingLink")}
              textContentType="none"
            />

            <FormToggle
              options={[{ text: "Public" }, { text: "Private" }]}
              name="type"
              width="30%"
            />
            <SubmitButton title={IMLocalized("save")} color="primary" />
          </Form>
        </View>
        <NoGradientButton title="Cancel" color="danger" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    overflow: "visible",
    backgroundColor: colors.background,
  },
  mainScreen: {
    zIndex: -1,
  },
  formContainer: {
    paddingBottom: 20,
  },
});

export default CreacteGroupEventScreen;
