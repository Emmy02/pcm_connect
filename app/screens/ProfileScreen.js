import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { colors } from "../config";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { Form, FormField, SubmitButton, FormToggle } from "../components/forms";

import { IMLocalized } from "./../config/IMLocalized";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .label(IMLocalized(IMLocalized("first_name"))),
  lastName: Yup.string().required().label(IMLocalized("last_name")),
  age: Yup.string().required().label(IMLocalized("age")),
  gender: Yup.string().required().label(IMLocalized("gender")),
  adventist: Yup.string().required().label(IMLocalized("adventist")),
  careerName: Yup.string().required().label(IMLocalized("career_name")),
  careerCategory: Yup.string().required().label(IMLocalized("career_name")),
  cover: Yup.string().required().label(IMLocalized("about_me")),
});

function ProfileScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("./../assets/user.png")} />
        <Text style={styles.pictureIndication}>
          {IMLocalized("tabImageToReplace")}
        </Text>
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
            name="first_name"
            placeholder={IMLocalized("first_name")}
            textContentType="name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="last_name"
            placeholder={IMLocalized("last_name")}
            textContentType="name"
          />
          <View style={styles.profileControls}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              name="age"
              placeholder={IMLocalized("age")}
              textContentType="none"
              width="30%"
            />
            <FormToggle
              options={[{ text: "F" }, { text: "M" }]}
              name="gender"
              width="30%"
            />
            <FormToggle
              options={[{ text: "SDA" }, { text: "NON-SDA" }]}
              name="adventist"
              width="30%"
            />
          </View>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="career_name"
            placeholder={IMLocalized("career_name")}
            textContentType="none"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={true}
            name="cover"
            placeholder={IMLocalized("about_me")}
            numberOfLines={3}
            multiline
            maxLength={255}
          />

          <SubmitButton title={IMLocalized("update")} color="primary" />
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
    borderRadius: 30,
  },
  profileControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  pictureIndication: {
    fontSize: 14,
    color: colors.medium,
    fontWeight: "300",
    marginVertical: 10,
  },
});

export default ProfileScreen;
