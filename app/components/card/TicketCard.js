import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../Text";
import { colors } from "../../config";

import { LinearGradient } from "expo-linear-gradient";

import dayjs from "dayjs";

import { IMLocalized } from "./../../config/IMLocalized";

function TicketCard({
  title,
  description,
  status,
  assigned_to,
  created_at,
  comment,
}) {
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
            {dayjs(created_at).format("ddd, MMM D, YYYY h:mm A")}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
        {assigned_to && (
          <View style={styles.supportContainer}>
            <Text style={styles.description} numberOfLines={3}>
              {comment}
            </Text>
            <Text style={styles.assigned_to} numberOfLines={1}>
              - {assigned_to?.first_name} {assigned_to?.last_name}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.typeContainer}>
        {status === "closed" && (
          <View style={styles.typeLabel}>
            <LinearGradient
              start={{ x: 0.2, y: 0 }}
              locations={[0, 1]}
              end={[1.3, 0]}
              colors={[colors.primary, colors.secondary]}
              style={styles.gradientType}
            >
              <Text style={styles.typeText}>{IMLocalized(status)}</Text>
            </LinearGradient>
          </View>
        )}

        {(status === "open" || status === "in_progress") && (
          <View style={styles.typeLabel}>
            <LinearGradient
              start={{ x: 0.2, y: 0 }}
              locations={[0, 1]}
              end={[1.3, 0]}
              colors={[colors.secondary, colors.danger]}
              style={styles.gradientType}
            >
              <Text style={styles.typeText}>{IMLocalized(status)}</Text>
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
    borderRadius: 10,
    borderColor: colors.clear,
    borderWidth: 1,
    overflow: "visible",
    maxHeight: 220,
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
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 14,
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
    fontSize: 12,
    fontWeight: "bold",
  },
  supportContainer: {
    backgroundColor: colors.light,
    padding: 10,
  },
  assigned_to: {
    color: colors.black,
    fontSize: 12,
  },
});

export default TicketCard;
