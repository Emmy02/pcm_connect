import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SubmitButton, FormField, Form, FormGoogleInput } from "./../forms";
import MapView, { Marker } from "react-native-maps";

import Title from "./../Title";

import groupsApi from "./../../api/groups";

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
});
import { IMLocalized } from "./../../config/IMLocalized";

function GroupForm({ id, name, description, lat, lng, address, setUpdated }) {
  const [initialValues, setInitialValues] = useState({});

  const [location, setLocation] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onSelect = ({ lat, lng }) => {
    let loc = {
      ...location,
      latitude: lat,
      longitude: lng,
    };
    setLocation(loc);
  };

  const handleSubmit = async ({ address, description, name }) => {
    const results = await groupsApi.updateGroup(id, {
      address,
      description,
      name,
      lat: location.latitude,
      lng: location.longitude,
    });

    if (results.ok) {
      setUpdated();
    }
  };

  useEffect(() => {
    setInitialValues({
      name,
      description,
      address,
    });
  }, []);

  return (
    <View style={styles.formContainer}>
      <Title>{IMLocalized("groupUpdate")}</Title>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
        <FormGoogleInput
          autoCapitalize="none"
          name="address"
          textContentType="none"
          onSelect={onSelect}
        />
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={location}>
            <Marker coordinate={location} title="" />
          </MapView>
        </View>

        <SubmitButton title={IMLocalized("update")} color="primary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
  },
});

export default GroupForm;
