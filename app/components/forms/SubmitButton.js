import React from "react";
import { useFormikContext } from "formik";

import { FillButton } from "./../button";

function SubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return <FillButton title={title} onPress={handleSubmit} {...otherProps} />;
}

export default SubmitButton;
