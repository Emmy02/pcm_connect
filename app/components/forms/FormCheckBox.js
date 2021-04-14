import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";

function AppFormCheckBox({ linkComponent, name, width, ...otherProps }) {
  const {
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormikContext();

  return (
    <View>
      {linkComponent}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppFormCheckBox;
