import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from "react-native";

import { colors } from "../config";
import Screen from "../components/Screen";

import { TopNav } from "./../components/nav";

import * as Yup from "yup";
import { Form, FormField, SubmitButton, FormToggle } from "../components/forms";
import { color } from "react-native-reanimated";

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
        <Image style={styles.image} source={require("./../assets/user.png")} />
        <Text style={styles.pictureIndication}>
          Tab image to replace it with new one
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
            placeholder="First Name"
            textContentType="name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="last_name"
            placeholder="Last Name"
            textContentType="name"
          />
          <View style={styles.profileControls}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              name="age"
              placeholder="Age"
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
              name="gender"
              width="30%"
            />
          </View>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="career_name"
            placeholder="Career Name"
            textContentType="none"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={true}
            name="cover"
            placeholder="About Me"
            numberOfLines={3}
            multiline
            maxLength={255}
          />

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
