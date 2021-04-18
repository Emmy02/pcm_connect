import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { colors } from "../../config";

import { NoGradientButton } from "./../../components/button";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SubmitButton, FormPicker, Form } from "./../forms";
import { IMLocalized } from "./../../config/IMLocalized";

import AdventistEntitiesItem from "./AdventistEntitiesItem";

import groupsApi from "./../../api/groups";
import adventistEntitiesApi from "./../../api/adventistEntities";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  adventist_union_id: Yup.number().required().label("Adventist Union"),
  adventist_association_id: Yup.string()
    .required()
    .label("Adventist Association"),
});

function GroupRequestCard({
  id,
  name,
  university,
  address,
  lat,
  lng,
  description,
  user,
  onReject,
  onAccepted,
  adventist_unions = [],
}) {
  const [adventistAssociations, setadventistAssociations] = useState([]);

  const handleSubmit = async ({ adventist_association_id }) => {
    const results = await groupsApi.acceptGroup(id, {
      adventist_association_id,
    });

    if (results.ok) {
      onAccepted();
    }
  };

  const onSelect = async (adventist_union_id) => {
    const results = await adventistEntitiesApi.getAdventistAssociations(
      1,
      adventist_union_id
    );

    if (results.ok) {
      setadventistAssociations(results.data);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: lng }}
              title={name}
            />
          </MapView>
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
          <Text style={[styles.text, { width: "90%" }]}>{address}</Text>
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
          <Text style={styles.text}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
      </View>
      <View style={styles.selectorsContainer}>
        <Form
          initialValues={{
            adventist_association_id: "",
            adventist_union_id: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormPicker
            items={adventist_unions}
            name="adventist_union_id"
            numberOfColumns={1}
            PickerItemComponent={AdventistEntitiesItem}
            placeholder={IMLocalized("selectUnion")}
            onSelect={onSelect}
            width="100%"
          />

          <FormPicker
            items={adventistAssociations}
            name="adventist_association_id"
            numberOfColumns={1}
            PickerItemComponent={AdventistEntitiesItem}
            placeholder={IMLocalized("selectConference")}
            width="100%"
          />

          <View style={styles.controlsContainer}>
            <View style={styles.buttonContainer}>
              <SubmitButton title={IMLocalized("accept")} color="clear" />
            </View>
            <View style={styles.buttonContainer}>
              <NoGradientButton
                title={IMLocalized("reject")}
                onPress={() => onReject(id)}
                color="danger"
              />
            </View>
          </View>
        </Form>
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
