import React, { useState } from "react";
import { useFormikContext } from "formik";

import { View, Platform, Text, StyleSheet } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import ErrorMessage from "./ErrorMessage";
import { NoGradientButton } from "../button";
import { IMLocalized } from "./../../config/IMLocalized";

function AppFormPicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const onChangeIos = (event, selectedDate) => {
    setFieldValue(selectedDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const isAndroid = Platform.OS === "android";

  return (
    <View>
      {!isAndroid && (
        <View style={styles.dateContainer}>
          <Text style={styles.text}>{IMLocalized("select_date")}</Text>
          <DateTimePicker
            style={{ width: "100%" }}
            testID="dateTimePicker"
            value={date}
            mode={"datetime"}
            display="default"
            is24Hour={true}
            onChange={(event, date) => {
              setDate(date);
              setFieldValue(name, date);
            }}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </View>
      )}
      {isAndroid && (
        <View>
          <NoGradientButton onPress={() => showMode("time")} title="Set Time" />
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display="default"
            onChange={onChange}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginRight: 10,
  },
});

export default AppFormPicker;
