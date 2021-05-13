import React from "react";
import { ScrollView } from "react-native";

import Title from "./../Title";

import { IMLocalized } from "./../../config/IMLocalized";

import socialMediaApi from "./../../api/socialMedia";

import { SubmitButton, FormField, Form } from "./../forms";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  facebook: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .label("Facebook"),
  twitter: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .label("Twitter"),
  instagram: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .label("Instagram"),
});

function SocialMediaForm({
  groupId,
  socialMedia: { facebook = "", twitter = "", instagram = "" },
  setUpdated,
}) {
  const handleSubmit = async ({ facebook, twitter, instagram }) => {
    const results = await socialMediaApi.setSocialMedia(groupId, {
      facebook,
      twitter,
      instagram,
    });

    if (results.ok) {
      setUpdated();
    }
  };
  return (
    <ScrollView>
      <Title>{IMLocalized("socialMedia")}</Title>
      <Form
        initialValues={{ facebook, twitter, instagram }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="facebook"
          placeholder={IMLocalized("facebook")}
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="twitter"
          placeholder={IMLocalized("twitter")}
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="instagram"
          placeholder={IMLocalized("instagram")}
          textContentType="none"
        />

        <SubmitButton title={IMLocalized("save")} color="primary" />
      </Form>
    </ScrollView>
  );
}

export default SocialMediaForm;
