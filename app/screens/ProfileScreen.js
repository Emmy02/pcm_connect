import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { colors } from "../config";
import Screen from "../components/Screen";
import * as Yup from "yup";
import {
  Form,
  FormField,
  SubmitButton,
  FormToggle,
  FormPicker as Picker,
} from "../components/forms";

import { IMLocalized } from "./../config/IMLocalized";
import { TopNav } from "../components/nav";

import { getCareerCategories } from "./../utility/utils";

import CategoryPickerItem from "../components/CategoryPickerItem";
import accountApi from "./../api/account";
import { ScrollView } from "react-native-gesture-handler";

import UploadScreen from "./UploadScreen";

import UploadAvatar from "./../components/AvatarUpload";

import useAccount from "./../account/useAccount";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required()
    .label(IMLocalized(IMLocalized("first_name"))),
  last_name: Yup.string().required().label(IMLocalized("last_name")),
  age: Yup.number().required().label(IMLocalized("age")),
  gender: Yup.string().required().label(IMLocalized("gender")),
  is_adventist: Yup.boolean().required().label(IMLocalized("adventist")),
  career_name: Yup.string().required().label(IMLocalized("career_name")),
  career_category: Yup.string()
    .required()
    .label(IMLocalized("career_category")),
  cover: Yup.string().required().label(IMLocalized("about_me")),
});

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ProfileScreen({ navigation }) {
  const [initialValues, setInitialValues] = useState({});
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const { setProfile, profile = {}, getRoles } = useAccount();

  const getProfile = async () => {
    const result = await accountApi.getProfile();
    if (result.ok) {
      let data = result.data.user_profile;

      if (data.age) data.age = data.age.toString();

      setInitialValues(data);
      setProfile(result.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const categories = getCareerCategories();

  const handleSubmit = async ({
    first_name,
    last_name,
    age,
    gender,
    is_adventist,
    career_name,
    career_category,
    cover,
  }) => {
    const g = gender === "female" ? 0 : 1;
    const a = is_adventist ? 1 : 0;

    const results = accountApi.updateProfile({
      first_name,
      last_name,
      age,
      gender: g,
      is_adventist: a,
      career_name,
      career_category,
      cover,
    });

    if (results.ok) console.log("ok");
  };

  const loadImage = async (image) => {
    setProgress(0);
    setUploadVisible(true);

    const data = new FormData();
    data.append("avatar", image);

    const result = await accountApi.uploadAvatar(data, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    if (result.ok) {
      await getProfile();
      setUploadVisible(false);
    }
  };

  const baseUrl = "https://pcm-api.herokuapp.com";
  const defaultImage = profile.avatar
    ? { uri: baseUrl + profile.avatar }
    : require("./../assets/user.png");

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />

      <TopNav navigation={navigation} />

      <ScrollView style={{ overflow: "hidden", zIndex: -1 }}>
        <KeyboardAwareScrollView>
          <View style={styles.imageContainer}>
            <UploadAvatar
              imageUri={defaultImage}
              onChangeImage={(image) => loadImage(image)}
            />
            <Text style={styles.pictureIndication}>
              {IMLocalized("tabImageToReplace")}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
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
                  keyboardType="number-pad"
                  name="age"
                  placeholder={IMLocalized("age")}
                  width="30%"
                />
                <FormToggle
                  options={[
                    { text: "F", value: "female" },
                    { text: "M", value: "male" },
                  ]}
                  name="gender"
                  width="30%"
                />
                <FormToggle
                  options={[
                    { text: "NON-SDA", value: 0 },
                    { text: "SDA", value: 1 },
                  ]}
                  name="is_adventist"
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
              <Picker
                items={categories}
                name="career_category"
                numberOfColumns={3}
                PickerItemComponent={CategoryPickerItem}
                placeholder={IMLocalized("career_category")}
                width="100%"
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={true}
                name="cover"
                placeholder={IMLocalized("about_me")}
                numberOfLines={3}
                multiline
                maxLength={300}
              />

              <SubmitButton
                title={IMLocalized("updateButton")}
                color="primary"
              />
            </Form>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    overflow: "visible",
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    zIndex: -1,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 30,
    zIndex: -1,
  },
  profileControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  pictureIndication: {
    fontSize: 14,
    color: colors.medium,
    fontWeight: "300",
    marginVertical: 10,
  },
});

export default ProfileScreen;
