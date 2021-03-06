import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

import Text from "../Text";
import { colors } from "../../config";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";

function EventCard({
  title,
  subtitle,
  expiration_date,
  audience,
  attendants,
  description,
  place,
  controls,
}) {
  const getURL = async (string = "") => {
    let matches = string.match(/\bhttps?:\/\/\S+/gi);

    if (matches.length !== 0) _handlePressButtonAsync(matches[0]);
  };

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <LinearGradient
          start={{ x: 0.3, y: 1 }}
          locations={[0, 0.9]}
          end={[0.9, 0.2]}
          colors={[colors.primary, colors.secondary]}
          style={styles.gradient}
        >
          <Text style={[styles.dateTime, styles.dateText]}>
            {dayjs(expiration_date).format("ddd, MMM D, YYYY h:mm A")}
          </Text>
          <Text style={[styles.peopleGoing, styles.dateText]}>
            {attendants.length + " people going"}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <View>
          <TouchableOpacity onPress={() => getURL(place)}>
            <View style={styles.listContainer}>
              <MaterialCommunityIcons
                name={"link-variant"}
                size={24}
                color={colors.medium}
                style={styles.icon}
              />
              <Text>{place}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {controls}
      </View>
      <View style={styles.typeContainer}>
        {audience === "everyone" && (
          <View style={styles.typeLabel}>
            <LinearGradient
              start={{ x: 0.2, y: 0 }}
              locations={[0, 1]}
              end={[1.3, 0]}
              colors={[colors.primary, colors.secondary]}
              style={styles.gradientType}
            >
              <Text style={styles.typeText}>{audience}</Text>
            </LinearGradient>
          </View>
        )}

        {audience === "team" && (
          <View style={styles.typeLabel}>
            <LinearGradient
              start={{ x: 0.2, y: 0 }}
              locations={[0, 1]}
              end={[1.3, 0]}
              colors={[colors.secondary, colors.danger]}
              style={styles.gradientType}
            >
              <Text style={styles.typeText}>{audience}</Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    minHeight: 220,
    maxHeight: 320,
    borderRadius: 10,
    borderColor: colors.clear,
    borderWidth: 1,
    overflow: "visible",
  },
  dateContainer: {
    height: "100%",
    width: "30%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },
  dateText: {
    color: "#fff",
  },
  dateTime: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "45%",
    padding: 10,
  },
  typeContainer: {
    width: "25%",
    padding: 10,
  },
  peopleGoing: {
    position: "absolute",
    bottom: 15,
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    paddingBottom: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  link: {
    paddingTop: 10,
    fontSize: 14,
  },
  description: {
    color: colors.medium,
    fontSize: 14,
  },
  typeLabel: {
    borderRadius: 20,
  },
  gradientType: {
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    paddingRight: 10,
  },
});

export default EventCard;
