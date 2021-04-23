import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import * as Yup from "yup";

import { Form, FormField, SubmitButton, ErrorMessage } from "./../forms";
import { IMLocalized } from "./../../config/IMLocalized";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

import authApi from "./../../api/auth";
import useAuth from "./../../auth/useAuth";

import ActivityIndicator from "./../ActivityIndicator";

function LoginForm() {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    const result = await authApi.login(email, password);

    setLoading(false);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
    auth.saveCrendentials({ email, password });
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder={IMLocalized("typeYourEmail")}
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          placeholder={IMLocalized("typeYourPassword")}
          secureTextEntry
          textContentType="password"
        />

        <SubmitButton title={IMLocalized("logIn")} color="primary" />
      </Form>
      <ActivityIndicator visible={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
});

export default LoginForm;
