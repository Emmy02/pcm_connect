import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";

import { Form, FormField, SubmitButton } from "./../../components/forms";
import { IMLocalized } from "./../../config/IMLocalized";

import { NavBack } from "./../../components/nav";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(10).max(30).label(IMLocalized("title")),
  subtitle: Yup.string()
    .required()
    .min(10)
    .max(30)
    .label(IMLocalized("subtitle")),
  description: Yup.string()
    .required()
    .min(20)
    .max(300)
    .label(IMLocalized("description")),
  place: Yup.string().required().min(0).max(50).label(IMLocalized("place")),
  expiration_date: Yup.string().required().label("event_date"),
});

function NoticeFormScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />
      <ScrollView style={styles.mainScreen}>
        <Title>{IMLocalized("createTerritoryEvent")}</Title>
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
              name="expiration_date"
              placeholder={IMLocalized("date")}
              textContentType="none"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="place"
              placeholder={IMLocalized("meetingLink")}
              textContentType="none"
            />
            <SubmitButton title={IMLocalized("save")} color="primary" />
          </Form>
        </View>
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

export default NoticeFormScreen;
