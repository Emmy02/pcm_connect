import React from "react";
import { View, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { colors, defaultStyles } from "../../config";

function GradientCard({ children, height }) {
  return (
    <View style={[styles.card, { height }]}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        locations={[1, 0]}
        end={{ x: 1, y: 1 }}
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    minHeight: 200,
    maxHeight: 250,
    borderRadius: 10,
    overflow: "visible",
    borderRadius: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default GradientCard;
