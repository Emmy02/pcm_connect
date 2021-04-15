import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import * as Yup from "yup";

import { Form, FormField, SubmitButton, ErrorMessage } from "./../forms";

import { IMLocalized } from "./../../config/IMLocalized";

import authApi from "./../../api/auth";
import useAuth from "./../../auth/useAuth";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const validationSchema = Yup.object().shape({
  code_reset: Yup.number().required(),
  password: Yup.string().required().min(4).label("Password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Required"),
});

function PasswordRecoveryForm() {
  const auth = useAuth();

  const [email, setEmail] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [canUpdate, setCanUptate] = useState(false);

  const handleSubmitEmail = async ({ email }) => {
    const results = await authApi.emailExits(email);

    if (results.ok) {
      const { exists } = results.data;
      setValidEmail(exists);
      setEmailFailed(!exists);
      setEmail(email);

      if (exists) {
        const r = await authApi.sendInstructions(email);

        if (r.ok) setCanUptate(true);
      }
    }
  };

  const handleSubmit = async ({ code_reset, password }) => {
    const results = await authApi.updatePassword({
      email,
      password,
      code_reset,
    });

    if (results.ok) {
      if (results.data.success) {
        const res = await authApi.login(email, password);
        if (res.ok) {
          auth.logIn(res.data);
          auth.saveCrendentials({ email, password });
        }
      }
    } else {
      setEmailFailed(false);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      {!validEmail && (
        <Form
          initialValues={{ email: "" }}
          onSubmit={handleSubmitEmail}
          validationSchema={emailValidationSchema}
        >
          <ErrorMessage error="Invalid data" visible={emailFailed} />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            placeholder={IMLocalized("typeYourEmail")}
            textContentType="emailAddress"
          />
          <SubmitButton color="primary" title={IMLocalized("validate")} />
        </Form>
      )}
      {canUpdate && (
        <Form
          initialValues={{ password: "", confirm_password: "", code_reset: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error="Invalid data" visible={emailFailed} />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            name="code_reset"
            placeholder={IMLocalized("resetCode")}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder={IMLocalized("typeNewPassword")}
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="confirm_password"
            placeholder={IMLocalized("confirmNewPassword")}
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={IMLocalized("logIn")} color="primary" />
        </Form>
      )}
    </ScrollView>
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
