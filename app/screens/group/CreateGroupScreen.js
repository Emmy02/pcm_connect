import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "./../../components/Screen";
import colors from "../../config/colors";

import Title from "./../../components/Title";

import groupsApi from "./../../api/groups";
import useApi from "./../../hooks/useApi";

import MapView from "react-native-maps";

import { mapStyles } from "./../../config";

import {
  SubmitButton,
  FormField,
  FormGoogleInput,
  Form,
} from "./../../components/forms";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Name"),
  description: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Description"),
  address: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Address"),
  country: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Country"),
  university: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("University"),
});

import { IMLocalized } from "./../../config/IMLocalized";

function GroupDetailScreen({ navigation }) {
  return (
    <Screen style={styles.mainScreen}>
      <Title> {IMLocalized("createGroupButton")}</Title>
      <Form
        initialValues={{
          description: "",
          name: "",
          address: "",
          country: "",
          university: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="name"
          placeholder={IMLocalized("name")}
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
          name="country"
          placeholder={IMLocalized("country")}
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={true}
          name="university"
          placeholder={IMLocalized("university")}
          textContentType="none"
        />
        <FormGoogleInput
          autoCapitalize="none"
          name="address"
          textContentType="none"
        />
        <View style={styles.mapContainer}>
          <MapView style={styles.map} customMapStyle={mapStyles} />
        </View>
        <SubmitButton title={IMLocalized("create")} color="primary" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.white,
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

export default GroupDetailScreen;
