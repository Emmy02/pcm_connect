import React, { useState, useEffect, Profiler } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Screen from "./../../components/Screen";
import colors from "../../config/colors";

import Title from "./../../components/Title";

import groupsApi from "./../../api/groups";
import countriesApi from "./../../api/countries";
import universitiesApi from "./../../api/universities";

import useApi from "./../../hooks/useApi";

import accountApi from "./../../api/account";
import useAccount from "./../../account/useAccount";

import MapView, { Marker } from "react-native-maps";

import { mapStyles } from "./../../config";

import { NavBack } from "./../../components/nav";
import {
  SubmitButton,
  FormField,
  FormGoogleInput,
  Form,
  FormAutoCompleteInput,
} from "./../../components/forms";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  country_id: Yup.number().required().label("Country"),
  university_id: Yup.number().required().label("University"),
});

import { IMLocalized } from "./../../config/IMLocalized";

function GroupDetailScreen({ navigation, route }) {
  const { setProfile, profile, getRoles } = useAccount();
  const { roles, resources } = getRoles(profile?.roles);
  const { userId } = route.params;

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [countryQuery, setCountryQuery] = useState("");
  const [countryHideResults, setCountryHideResults] = useState(true);

  const [universities, setUniversities] = useState([]);
  const [universityQuery, setUniversityQuery] = useState("");
  const [universityHideResults, setUniversityHideResults] = useState(true);

  const onSelect = ({ lat, lng }) => {
    let loc = {
      ...location,
      latitude: lat,
      longitude: lng,
    };
    setLocation(loc);
  };

  const getCountries = async () => {
    const results = await countriesApi.getCountries();

    if (results.ok) {
      setCountries(results.data);
      setDefaultCountry(results.data);
    }
  };

  const onChangeTextCountry = (text = "") => {
    setCountryQuery(text);

    if (text.trim().length === 0) {
      setCountries(defaultCountry);
      setCountryHideResults(true);
    } else {
      setCountryHideResults(false);
      const regex = new RegExp(`${text.trim()}`, "i");
      const find = countries.filter(
        (country) => country.name.search(regex) >= 0
      );

      setCountries(find);
    }
  };

  const onChangeTextUniversity = async (text = "") => {
    setUniversityQuery(text);

    if (text.trim().length === 0) {
      setUniversities(defaultUniversities);
      setUniversityHideResults(true);
    } else {
      setUniversityHideResults(false);
      const results = await universitiesApi.getRemoteUniversities(
        text,
        countryQuery
      );

      if (results.ok) {
        setUniversities(results.data);
      }
    }
  };

  const getProfile = async () => {
    const result = await accountApi.getProfile();
    if (result.ok) setProfile(result.data);
  };

  const handleSubmit = async (data, { resetForm }) => {
    const universityResults = await universitiesApi.setUniversity(
      universityQuery,
      countryQuery,
      data.country_id
    );

    if (universityResults.ok) {
      const d = {
        ...data,
        lat: location.latitude,
        lng: location.longitude,
        created_by: userId,
        university_id: universityResults.data.id,
      };

      const results = await groupsApi.addGroup(d);

      if (results.ok) {
        resetForm();
        await getProfile();
        navigation.goBack();
      }
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    getCountries();

    return () => {};
  }, []);

  return (
    <Screen style={styles.mainScreen}>
      <NavBack onPress={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <Title> {IMLocalized("createGroupButton")}</Title>
          <Form
            initialValues={{
              description: "",
              name: "",
              address: "",
              country_id: "",
              university_id: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormAutoCompleteInput
              autoCapitalize="none"
              autoCorrect={true}
              name="country_id"
              placeholder={IMLocalized("country")}
              textContentType="none"
              items={countries}
              onChangeText={onChangeTextCountry}
              text={countryQuery}
              setQuery={setCountryQuery}
              hideResults={countryHideResults}
              setHideResults={setCountryHideResults}
            />

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

            <FormAutoCompleteInput
              autoCapitalize="none"
              autoCorrect={true}
              name="university_id"
              placeholder={IMLocalized("university")}
              textContentType="none"
              items={universities}
              onChangeText={onChangeTextUniversity}
              text={universityQuery}
              setQuery={setUniversityQuery}
              hideResults={universityHideResults}
              setHideResults={setUniversityHideResults}
            />
            <FormGoogleInput
              autoCapitalize="none"
              name="address"
              textContentType="none"
              onSelect={onSelect}
            />

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                customMapStyle={mapStyles}
                region={location}
              >
                <Marker coordinate={location} title="" />
              </MapView>
            </View>

            <SubmitButton title={IMLocalized("create")} color="primary" />
          </Form>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
    height: "100%",
  },
  mapContainer: {
    width: "100%",
  },
  map: {
    height: 80,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default GroupDetailScreen;
