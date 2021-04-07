import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";

import {
  Form,
  FormField,
  SubmitButton,
  FormToggle,
  FormDateTime,
} from "./../../components/forms";
import { IMLocalized } from "./../../config/IMLocalized";

import { NavBack } from "./../../components/nav";

import eventsApi from "./../../api/events";

import * as Yup from "yup";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(10).max(30).label(IMLocalized("title")),
  subtitle: Yup.string()
    .required()
    .min(10)
    .max(30)
    .label(IMLocalized("subtitle")),
  description: Yup.string()
    .required()
    .min(20)
    .max(300)
    .label(IMLocalized("description")),
  place: Yup.string().required().min(0).max(50).label(IMLocalized("place")),
  audience: Yup.number().required().label(IMLocalized("audience")),
  expiration_date: Yup.string().required().label("event_date"),
});

function CreacteGroupEventScreen({ navigation, route }) {
  const { updated, setUpdated, groupId, userId } = route.params;

  const handleSubmit = async ({
    title,
    subtitle,
    description,
    place,
    audience,
    expiration_date,
    created_by = userId,
  }) => {
    const result = await eventsApi.addEvent(groupId, {
      title,
      subtitle,
      description,
      place,
      audience,
      expiration_date,
      created_by,
    });

    if (result.ok) {
      setUpdated(!updated);
      navigation.goBack();
    }
  };

  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />
      <ScrollView style={styles.mainScreen}>
        <KeyboardAwareScrollView>
          <Title>{IMLocalized("createEvent")}</Title>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                title: "",
                description: "",
                subtitle: "",
                expiration_date: "",
                place: "",
                audience: 0,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholder={IMLocalized("title")}
                textContentType="none"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={true}
                name="subtitle"
                placeholder={IMLocalized("subtitle")}
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
              <FormDateTime name="expiration_date" />
              <FormField
                autoCapitalize="none"
                autoCorrect={true}
                name="place"
                placeholder={IMLocalized("meetingLink")}
                textContentType="none"
              />

              <FormToggle
                options={[
                  { text: IMLocalized("public") },
                  { text: IMLocalized("private") },
                ]}
                name="type"
                width="30%"
                name="audience"
              />
              <SubmitButton title={IMLocalized("save")} color="primary" />
            </Form>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    overflow: "visible",
    backgroundColor: colors.background,
  },
  mainScreen: {
    zIndex: -1,
  },
  formContainer: {
    paddingBottom: 20,
  },
});

export default CreacteGroupEventScreen;
