import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
} from "react-native";

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

function GroupDetailScreen({ navigation }) {
  return (
    <Screen style={styles.mainScreen}>
      <Title>Create New Group</Title>
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
          placeholder="Type in name"
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
          name="country"
          placeholder="Type in Country"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={true}
          name="university"
          placeholder="Type in University"
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
        <SubmitButton title="Create" color="primary" />
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
