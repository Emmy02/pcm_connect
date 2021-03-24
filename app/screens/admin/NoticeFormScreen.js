import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { TopNav } from "../../components/nav";

import { NoGradientButton } from "./../../components/button";

import { Form, FormField, SubmitButton } from "./../../components/forms";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function NoticeFormScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <ScrollView style={styles.mainScreen}>
        <Title>Create Territory's Event</Title>
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
              placeholder="Title"
              textContentType="none"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="subtitle"
              placeholder="SubTitle"
              textContentType="none"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="description"
              placeholder="Description"
              numberOfLines={3}
              multiline
              maxLength={255}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="date"
              placeholder="Date"
              textContentType="none"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="meeting-link"
              placeholder="Meeting Link"
              textContentType="none"
            />
            <SubmitButton title="Save" color="primary" />
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
    backgroundColor: colors.white,
  },
  mainScreen: {
    zIndex: -1,
  },
  formContainer: {
    paddingBottom: 20,
  },
});

export default NoticeFormScreen;
