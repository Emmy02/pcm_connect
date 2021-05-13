import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Title from "./../Title";

import { IMLocalized } from "./../../config/IMLocalized";
import IconListItem from "./../../components/IconListItem";

import * as WebBrowser from "expo-web-browser";

import TextInput from "./../TextInput";

import socialMediaApi from "./../../api/socialMedia";

import { SubmitButton, FormField, Form, FormGoogleInput } from "./../forms";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  facebook: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .required()
    .label("Facebook"),
  twitter: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .required()
    .label("Twitter"),
  instagram: Yup.string()
    .min(2, "Too Short")
    .max(80, "Too Long")
    .required()
    .label("Instagram"),
});

function SocialMedia({ socialMedia }) {
  const { facebook, twitter, instagram } = socialMedia;

  const getURL = async (string = "") => {
    let matches = string.match(/\bhttps?:\/\/\S+/gi);

    if (matches.length !== 0) _handlePressButtonAsync(matches[0]);
  };

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <ScrollView>
      <Title>{IMLocalized("socialmedia")}</Title>
      <View>
        <TouchableOpacity onPress={() => getURL(facebook)}>
          <IconListItem name="facebook" iconColor="#3b5998" text={facebook} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getURL(twitter)}>
          <IconListItem name="twitter" iconColor="#00acee" text={twitter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getURL(instagram)}>
          <IconListItem name="instagram" iconColor="#f46f30" text={instagram} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SocialMedia;
