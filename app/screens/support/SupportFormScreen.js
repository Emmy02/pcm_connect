import React from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import { colors } from "../../config";
import { SubmitButton, FormField, Form } from "./../../components/forms";
import * as Yup from "yup";

import Title from "./../../components/Title";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label(IMLocalized("title")),
  description: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label(IMLocalized("Description")),
});
import { IMLocalized } from "./../../config/IMLocalized";

function SupportFormScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <Title>{IMLocalized("reportAnIssueButton")}</Title>
      <View style={styles.formContainer}>
        <Form
          initialValues={{ description: "", title: "" }}
          onSubmit={(values) => console.log(values)}
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
            numberOfLines={3}
            multiline
            maxLength={255}
          />
          <SubmitButton title={IMLocalized("save")} color="primary" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { zIndex: -1, padding: 10, backgroundColor: colors.white },
});

export default SupportFormScreen;
