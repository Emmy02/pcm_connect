import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../../config";

function GradientCardContent({
  count,
  females,
  males,
  groups,
  newusers,
  universities,
}) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.statsNumber}>Stats</Text>
      <View style={styles.contentContainer}>
        <View style={styles.statsRowContainer}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{count}</Text>
            <Text style={styles.statsText}>Users</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{females}</Text>
            <Text style={styles.statsText}>Females</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{males}</Text>
            <Text style={styles.statsText}>Males</Text>
          </View>
        </View>
        <View style={styles.statsRowContainer}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{groups}</Text>
            <Text style={styles.statsText}>Groups</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{universities}</Text>
            <Text style={styles.statsText}>Universities</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{newusers}</Text>
            <Text style={styles.statsText}>Users w/o Group</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: "100%",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsNumber: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 26,
  },
  statsText: {
    color: colors.white,
  },
  statsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  statsRowContainer: {
    justifyContent: "center",
  },
});

export default GradientCardContent;
