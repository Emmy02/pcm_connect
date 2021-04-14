import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";

import {
  Form,
  FormField,
  SubmitButton,
  FormDateTime,
  ErrorMessage,
} from "./../../components/forms";
import { IMLocalized } from "./../../config/IMLocalized";

import { NavBack } from "./../../components/nav";

import * as Yup from "yup";

import DropboxModal from "./../../components/DropBoxModal";

import noticesApi from "./../../api/notices";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(10).max(30).label(IMLocalized("title")),
  subtitle: Yup.string()
    .required()
    .min(10)
    .max(30)
    .label(IMLocalized("subtitle")),
  description: Yup.string()
    .required()
    .min(20)
    .max(300)
    .label(IMLocalized("description")),
  place: Yup.string().required().min(0).max(50).label(IMLocalized("place")),
  expiration_date: Yup.string().required().label("event_date"),
});

function NoticeFormScreen({ navigation, route }) {
  const { userId } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [creatingError, setCreatingError] = useState(null);

  const handleSubmit = async ({
    title,
    subtitle,
    description,
    place,
    audience,
    expiration_date,
    created_by = userId,
  }) => {
    console.log(title);
    if (!image) return setCreatingError(true);

    const result = await noticesApi.addNotice({
      title,
      subtitle,
      description,
      place,
      audience,
      expiration_date,
      image_src: image,
      created_by,
    });

    if (result.ok) {
      navigation.goBack();
    }
  };

  return (
    <Screen style={styles.screen}>
      <DropboxModal
        onPress={setImage}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <NavBack onPress={() => navigation.goBack()} />
      <ScrollView style={styles.mainScreen}>
        <Title>{IMLocalized("createTerritoryEvent")}</Title>
        <View style={styles.formContainer}>
          <ErrorMessage
            visible={creatingError}
            error="Error while creating, check if you added an image"
          />
          <Form
            initialValues={{
              title: "",
              description: "",
              subtitle: "",
              expiration_date: "",
              place: "",
            }}
            onSubmit={handleSubmit}
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
              name="subtitle"
              placeholder={IMLocalized("subtitle")}
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
            <FormDateTime name="expiration_date" />
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              name="place"
              placeholder={IMLocalized("meetingLink")}
              textContentType="none"
            />

            <View>
              {image && (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    style={{
                      marginVertical: 10,
                      width: "100%",
                      minHeight: 150,
                      borderRadius: 10,
                    }}
                    source={{ uri: image }}
                  />
                </TouchableOpacity>
              )}
              {!image && (
                <View style={{ paddingBottom: 10 }}>
                  <NoGradientButton
                    title="select image"
                    onPress={() => setModalVisible(true)}
                    color="medium"
                  />
                </View>
              )}
            </View>
            <SubmitButton title={IMLocalized("save")} color="primary" />
          </Form>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    overflow: "visible",
    backgroundColor: colors.background,
  },
  mainScreen: {
    zIndex: -1,
  },
  formContainer: {
    paddingBottom: 20,
  },
});

export default NoticeFormScreen;
