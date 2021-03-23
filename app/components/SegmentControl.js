import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";

function Segment({ id, title, active, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      {!active && (
        <View style={styles.inactive}>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
      {active && (
        <View>
          <LinearGradient
            start={{ x: 1.7, y: 0.1 }}
            locations={[0.1, 1]}
            colors={[colors.primary, colors.secondary]}
            style={styles.background}
          >
            <Text style={[styles.activeText, styles.text]}>{title}</Text>
          </LinearGradient>
        </View>
      )}
    </TouchableOpacity>
  );
}

function SegmentControl({ segments, active, onPress }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.segmentContainer}>
        {segments.map((segment, index) => (
          <Segment
            key={index}
            {...segment}
            onPress={onPress}
            active={active === segment.id}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  segmentContainer: {
    width: 280,
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
    flexDirection: "row",
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 22,
  },
  background: {
    height: 44,
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    color: colors.white,
    fontWeight: "800",
  },
  inactive: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
  },
});

export default SegmentControl;
