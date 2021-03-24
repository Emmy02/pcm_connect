import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";
import { colors } from "../../config";

function FormToggle({ options, width }) {
  const { setFieldValue } = useFormikContext();

  const [active, setActive] = useState(0);

  const onPress = () => {
    const option = active ? 0 : 1;
    setActive(option);
    setFieldValue(option);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.toogleContainer, { width }]} width={width}>
        <Text style={styles.text}>{options[active].text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  toogleContainer: {
    height: 55,
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.medium,
  },
});

export default FormToggle;
