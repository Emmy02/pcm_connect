import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";
import { colors } from "../../config";

import ErrorMessage from "./ErrorMessage";

function FormToggle({ options, width, name }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const [active, setActive] = useState(0);
  const [clicked, setClicked] = useState(false);

  const onPress = () => {
    const option = active ? 0 : 1;
    setActive(option);

    setFieldValue(name, option);
    setClicked(true);
  };

  const option = values[name] === "male" || values[name] === true ? 1 : 0;

  if (option !== active && !clicked) setActive(option);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.toogleContainer, { width }]} width={width}>
        <Text style={styles.text}>{options[active].text}</Text>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
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
