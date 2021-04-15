import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "./../../config";
import { TouchableHighlight } from "react-native-gesture-handler";

function FormCheckMark({ component, name, width, ...otherProps }) {
  const [checked, setChecked] = useState(null);
  const { errors, touched, setFieldValue } = useFormikContext();

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {component}
      {!checked && (
        <TouchableHighlight
          onPress={() => {
            setChecked(true);
            setFieldValue(name, true);
          }}
        >
          <MaterialCommunityIcons
            name={"checkbox-blank-circle-outline"}
            size={40}
            color={colors.medium}
          />
        </TouchableHighlight>
      )}
      {checked && (
        <TouchableHighlight
          onPress={() => {
            setChecked(false);
            setFieldValue(name, null);
          }}
        >
          <MaterialCommunityIcons
            name={"checkbox-marked-circle"}
            size={40}
            color={colors.primary}
          />
        </TouchableHighlight>
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default FormCheckMark;
