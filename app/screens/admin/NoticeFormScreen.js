import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
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
import { createClient } from "pexels";

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
  const [photos, setPhotos] = useState(false);
  const [image, setImage] = useState(null);
  const [creatingError, setCreatingError] = useState(null);

  const client = createClient(
    "563492ad6f91700001000001f02799b4e2cc48488ad0f5ec036edc3c"
  );

  const getPhotos = (query) => {
    client.photos
      .search({ query, per_page: 20 })
      .then((res) => setPhotos(res.photos || []));
  };

  const handleSubmit = async ({
    title,
    subtitle,
    description,
    place,
    audience,
    expiration_date,
    created_by = userId,
  }) => {
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
      <NavBack onPress={() => navigation.goBack()} />
      <Title>{IMLocalized("createTerritoryEvent")}</Title>
      <ScrollView style={styles.mainScreen}>
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
                  <View style={styles.search}>
                    <TextInput
                      placeholder="Type in Image Filter Name"
                      style={styles.textInput}
                      onChangeText={(text) => getPhotos(text)}
                    />
                    <FlatList
                      horizontal
                      style={{ overflow: "visible" }}
                      data={photos}
                      keyExtractor={(photo) => photo.id.toString()}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setImage(item.src.medium);
                          }}
                        >
                          <Image
                            style={{
                              height: 100,
                              width: 100,
                              borderRadius: 10,
                              margin: 5,
                            }}
                            source={{ uri: item.src.medium }}
                          />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
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
  textInput: {
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: colors.light,
    padding: 10,
  },
});

export default NoticeFormScreen;
