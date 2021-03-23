import * as React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { colors } from "./../../config";

const GOOGLE_PLACES_API_KEY = "AIzaSyA_LOSPKLGA0FS3aDB3KU6zD-LEqAD4xwE";

function FormGoogleInput({ onPress }) {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        GooglePlacesSearchQuery={{ fields: "geometry" }}
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
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
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        onPress={(data, details = null) => {
          console.log("details+++++++", details);
        }}
        onFail={(error) => console.error(error)} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
  },
});

export default FormGoogleInput;
