import React, { useState } from "react";
import { View, StyleSheet, Modal, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { colors } from "./../../config";

const GOOGLE_PLACES_API_KEY = "AIzaSyA_LOSPKLGA0FS3aDB3KU6zD-LEqAD4xwE";

import { useFormikContext } from "formik";

import TextInput from "./../TextInput";
import { NoGradientButton } from "./../button";

import { IMLocalized } from "./../../config/IMLocalized";

function FormGoogleInput({ name, onSelect, width = "100%" }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { setFieldValue, values, setFieldTouched } = useFormikContext();
  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView>
          <View style={styles.modalView}>
            <NoGradientButton
              onPress={() => setModalVisible(false)}
              title="close"
            />

            <GooglePlacesAutocomplete
              placeholder="Type In Group's Address"
              style={{
                container: {
                  backgroundColor: colors.light,
                },
                textInput: {
                  height: 44,
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
                setModalVisible(false);
              }}
              onFail={(error) => console.error(error)}
              GooglePlacesDetailsQuery={{
                fields: "geometry",
              }}
              fetchDetails={true}
            />
          </View>
        </SafeAreaView>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          editable={false}
          onBlur={() => setFieldTouched(name)}
          width="60%"
          value={values[name]}
        />
        <NoGradientButton
          onPress={() => setModalVisible(true)}
          title={IMLocalized("setAddress")}
          width="35%"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    zIndex: 999,
  },
  modalView: {
    paddingHorizontal: 10,
    height: 400,
    paddingTop: 20,
  },
});

export default FormGoogleInput;
