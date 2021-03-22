import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

import { colors, defaultStyles } from "../../config";

import { NoGradientButton } from "./../../components/button";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SubmitButton, FormField, Form } from "./../forms";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  adventistUnion: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Adventist Union"),
  adventistAssociation: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Adventist Association"),
});

function GroupRequestCard({
  name,
  university,
  address: { street, lat, lng },
  description,
  createdBy,
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>
        <View style={styles.basicContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.groupContact}>
        <View style={styles.list}>
          <MaterialCommunityIcons
            name={"map-marker-radius"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text style={styles.text}>{street}</Text>
        </View>
        <View style={styles.list}>
          <MaterialCommunityIcons
            name={"home"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text style={styles.text}>{university.name}</Text>
        </View>
        <View style={styles.list}>
          <MaterialCommunityIcons
            name={"account-circle-outline"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text style={styles.text}>{createdBy.name}</Text>
        </View>
      </View>
      <View style={styles.selectorsContainer}>
        <Form
          initialValues={{ adventistAssociation: "", adventistUnion: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="none"
            name="adventistUnion"
            placeholder="Select Adventist Union"
            textContentType="none"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="none"
            name="adventistAssociation"
            placeholder="Select Adventist Association"
            textContentType="none"
          />
        </Form>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.buttonContainer}>
          <NoGradientButton title="Accept" color="clear" />
        </View>
        <View style={styles.buttonContainer}>
          <NoGradientButton title="Reject" color="danger" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.clear,
  },
  cardHeader: {
    flexDirection: "row",
  },
  basicContainer: {
    paddingLeft: 10,
    width: "60%",
  },
  name: {
    fontSize: 26,
    color: colors.secondary,
  },
  mapContainer: {
    width: "35%",
  },
  map: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  description: {
    color: colors.medium,
    paddingTop: 7,
  },
  text: {
    color: colors.medium,
  },
  controlsContainer: {
    paddingTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "45%",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  groupContact: {
    width: "100%",
  },
  icon: {
    paddingHorizontal: 7,
  },
  selectorsContainer: {
    width: "100%",
  },
});

export default GroupRequestCard;
