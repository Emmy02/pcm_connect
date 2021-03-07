import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import { LinearGradient } from "expo-linear-gradient";

function GradientCard({ children }) {
  return (
    <View style={styles.card}>
      <LinearGradient
        start={{ x: 0, y: 0.2 }}
        locations={[1, 0.1]}
        end={{ x: 2, y: 1.5 }}
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
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    minHeight: 200,
    maxHeight: 250,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "visible",
  },
  gradient: {
    width: "100%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GradientCard;
