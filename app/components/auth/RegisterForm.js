import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
  FormCheckMark,
} from "./../forms";

import authApi from "./../../api/auth";
import useAuth from "../../auth/useAuth";

import LinkComponent from "./../../components/LinkComponent";

import { IMLocalized } from "./../../config/IMLocalized";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails don't match!")
    .required("Required"),
  password: Yup.string().required().min(4).label("Password"),
  accepted: Yup.boolean().required(),
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
        initialValues={{
          email: "",
          confirmEmail: "",
          password: "",
          accepted: null,
        }}
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
          placeholder={IMLocalized("typeYourPassword")}
          secureTextEntry
          textContentType="password"
        />
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {IMLocalized("agreedToAccept")}
            <Text>
              <LinkComponent
                url="https://www.interamerica.org/es/legales/"
                text={IMLocalized("DIA")}
              />
            </Text>
            <LinkComponent
              url="https://drive.google.com/file/d/1bvtHBrWmb9rXxHRayle_BneMI6JgCAv3/view?usp=sharing"
              text={IMLocalized("PCM Connect")}
            />
          </Text>
        </View>
        <FormCheckMark name="accepted" width="100%" />
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
