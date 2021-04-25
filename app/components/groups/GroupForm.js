import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SubmitButton, FormField, Form, FormGoogleInput } from "./../forms";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Title from "./../Title";

import groupsApi from "./../../api/groups";
import ImageInput from "./../../components/ImageInput";
import UploadScreen from "./../../screens/UploadScreen";

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
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const [location, setLocation] = useState({
    latitude: lat || 0,
    longitude: lng || 0,
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

  const loadImage = async (image) => {
    setProgress(0);
    setUploadVisible(true);

    const data = new FormData();
    data.append("image", image);

    const result = await groupsApi.uploadImage(id, data, (progress) =>
      setProgress(progress)
    );

    setUploadVisible(false);

    if (!result.ok) {
      return alert("Could not save the listing");
    }

    if (result.ok) {
      setUpdated();
    }
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
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
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
          autoCorrect={false}
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
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={location}
          >
            <Marker coordinate={location} title="" />
          </MapView>
        </View>

        <ImageInput onChangeImage={(image) => loadImage(image)} />

        <SubmitButton title={IMLocalized("updateButton")} color="primary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
  },
  mapContainer: {
    height: 80,
    width: "100%",
    marginBottom: 10,
  },
  map: {
    height: 80,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default GroupForm;
