import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Text from "./Text";
import { IMLocalized } from "./../config/IMLocalized";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{IMLocalized(item.label)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
