import React from "react";
import { useFormikContext } from "formik";

import { NoGradientButton } from "./../button";

function SubmitButton({ title, color = "secondary", ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <NoGradientButton
      color={color}
      title={title}
      onPress={handleSubmit}
      {...otherProps}
    />
  );
}

export default SubmitButton;
