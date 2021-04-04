import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "./../../components/Screen";
import colors from "../../config/colors";

import Title from "./../../components/Title";

import requestsApi from "./../../api/requests";
import useApi from "./../../hooks/useApi";

import { NavBack } from "./../../components/nav";

import { SubmitButton, FormField, Form } from "./../../components/forms";

import accountApi from "./../../api/account";
import useAccount from "./../../account/useAccount";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label(IMLocalized("message")),
});

import { IMLocalized } from "./../../config/IMLocalized";

function JoinRequestMessageScreen({ navigation, route }) {
  const { id } = route.params;

  const { setProfile, profile, getRoles } = useAccount();

  const onSubmit = async ({ message = "" }) => {
    const results = await requestsApi.addRequest(id, {
      user_id: profile.id,
      group_id: id,
      message,
    });

    if (results.ok) {
      getProfile();
      navigation.goBack();
    }
  };

  const getProfile = async () => {
    const result = await accountApi.getProfile();
    if (result.ok) setProfile(result.data);
  };

  return (
    <Screen style={styles.mainScreen}>
      <NavBack onPress={() => navigation.goBack()} />
      <Title> {IMLocalized("write_message_to_group_admin")}</Title>
      <Form
        initialValues={{
          message: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={true}
          name="message"
          placeholder={IMLocalized("message")}
          numberOfLines={10}
          multiline
          maxLength={255}
        />

        <SubmitButton title={IMLocalized("send")} color="primary" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  mapContainer: {
    width: "100%",
  },
  map: {
    height: 120,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default JoinRequestMessageScreen;
