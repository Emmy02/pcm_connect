import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as Yup from "yup";

import { Form, FormField, SubmitButton, ErrorMessage } from "./../forms";

import authApi from "./../../api/auth";
import useAuth from "../../auth/useAuth";

import { IMLocalized } from "./../../config/IMLocalized";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails don't match!")
    .required("Required"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterForm() {
  const auth = useAuth();
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.signup(email, password);
    if (!result.ok) return setLoginFailed(true);
    setRegisterFailed(false);
    auth.logIn(result.data);
  };

  return (
    <View style={[styles.formContainer]}>
      <Form
        initialValues={{ email: "", confirmEmail: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid data while trying to register you, please try again."
          visible={registerFailed}
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
          keyboardType="email-address"
          name="confirmEmail"
          placeholder={IMLocalized("typeYourEmail")}
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          placeholder={IMLocalized("password")}
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title={IMLocalized("register")} color="primary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
});

export default RegisterForm;
