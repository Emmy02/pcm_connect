import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./../forms";
import { NoGradientButton } from "./../button";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function PasswordRecoveryForm() {
  return (
    <View style={styles.formContainer}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder=""
          textContentType="emailAddress"
        />
        <View style={styles.resetCode}>
          <View style={styles.resetCodeField}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              name="secret-code"
              placeholder="Tyoe your Secret Code"
              textContentType="postalCode"
            />
          </View>
          <View style={styles.noGradientButton}>
            <NoGradientButton color="clear" title="Resend code" />
          </View>
        </View>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="new-password"
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="new-password"
          placeholder="Confirm new Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Log In" color="primary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  resetCode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  resetCodeField: {
    width: "48%",
  },
  noGradientButton: {
    width: "48%",
  },
});

export default PasswordRecoveryForm;
