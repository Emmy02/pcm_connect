import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Image } from "react-native";

import { colors } from "../config";
import Screen from "../components/Screen";

import { TopNav } from "./../components/nav";

import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  age: Yup.string().required().label("Age"),
  gender: Yup.string().required().label("Gender"),
  adventist: Yup.string().required().label("Adventist"),
  careerName: Yup.string().required().label("Career Name"),
  careerCategory: Yup.string().required().label("Career Category"),
  language: Yup.string().required().label("Career Category"),
  cover: Yup.string().required().label("About Me"),
});

function ProfileScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("./../assets/1.jpg")} />
      </View>
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
            name="fullNmae"
            placeholder="Type your full name"
            textContentType="name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <View>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="fullNmae"
              placeholder="Type your full name"
              textContentType="name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
          </View>
          <SubmitButton title="Update" color="primary" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    overflow: "visible",
    flex: 1,
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
});

export default ProfileScreen;
