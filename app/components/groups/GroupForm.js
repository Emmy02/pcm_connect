import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import { SubmitButton, FormField, Form } from "./../forms";

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

function GroupForm({ id, name, description, address: { lat, long, street } }) {
  return (
    <View style={styles.formContainer}>
      <Form
        initialValues={{ description: "", name: "", address: "" }}
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
          name="address"
          placeholder="Type in Address"
          textContentType="none"
        />
        <SubmitButton title="Update" color="primary" />
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
