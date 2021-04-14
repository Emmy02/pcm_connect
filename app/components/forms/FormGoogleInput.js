import * as React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { colors } from "./../../config";

const GOOGLE_PLACES_API_KEY = "AIzaSyDUuDOUp_nCkxv7xvi9cM-dwgeC8ihfMmo";

import { useFormikContext } from "formik";

function FormGoogleInput({ name, onSelect }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Type In Group's Address"
        style={{
          container: {
            backgroundColor: colors.light,
          },
          textInputContainer: {},
          textInput: {
            height: 55,
            color: colors.medium,
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: colors.medium,
          },
          listView: {
            zIndex: 9999,
          },
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          fields: ["formatted_address", "name", "geometry"],
        }}
        onPress={(data, details = null) => {
          setFieldValue(name, data.description);
          onSelect({
            lng: details.geometry.location.lng,
            lat: details.geometry.location.lat,
          });
        }}
        onFail={(error) => console.error(error)}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: "geometry",
        }}
        fetchDetails={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    zIndex: 999,
  },
});

export default FormGoogleInput;
