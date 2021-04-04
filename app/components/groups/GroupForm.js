import React from "react";
import { StyleSheet, View } from "react-native";
import { SubmitButton, FormField, Form } from "./../forms";

import Title from "./../Title";

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

function GroupForm({ id, name, description, address: { lat, long, street } }) {
  return (
    <View style={styles.formContainer}>
      <Title>{IMLocalized("groupUpdate")}</Title>
      <Form
        initialValues={{ description: "", name: "", address: "" }}
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
          name="address"
          placeholder={IMLocalized("address")}
          textContentType="none"
        />
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
