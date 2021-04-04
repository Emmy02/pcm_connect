import React from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import { colors } from "../../config";
import { SubmitButton, FormField, Form } from "./../../components/forms";
import * as Yup from "yup";

import Title from "./../../components/Title";

import { NavBack } from "./../../components/nav";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label(IMLocalized("title")),
  description: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label(IMLocalized("description")),
});
import { IMLocalized } from "./../../config/IMLocalized";

import ticketsApi from "./../../api/tickets";

function SupportFormScreen({ navigation, route }) {
  const { setCreated, created } = route.params;

  const handleSubmit = async (ticket) => {
    const result = await ticketsApi.addTicket(ticket);

    if (!result.ok) return alert("Could not save the listing");
    if (result.ok) {
      setCreated(!created);
      navigation.goBack();
    }
  };

  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />
      <Title>{IMLocalized("reportAnIssueButton")}</Title>
      <View style={styles.formContainer}>
        <Form
          initialValues={{ description: "", title: "" }}
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
            name="description"
            placeholder={IMLocalized("description")}
            numberOfLines={6}
            multiline
            maxLength={500}
          />
          <SubmitButton title={IMLocalized("save")} color="primary" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { zIndex: -1, padding: 10, backgroundColor: colors.background },
});

export default SupportFormScreen;
