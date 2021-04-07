import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function AdventistEntitiesItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: "100%",
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdventistEntitiesItem;
