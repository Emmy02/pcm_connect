import React, { useState } from "react";
import { useFormikContext } from "formik";

import { View, Platform, Text, StyleSheet } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import ErrorMessage from "./ErrorMessage";
import { NoGradientButton } from "../button";
import { IMLocalized } from "./../../config/IMLocalized";
import TextInput from "./../../components/TextInput";

function AppFormPicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeAndroid = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    setDate(currentDate);

    setFieldValue(name, currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <NoGradientButton
            onPress={showDatepicker}
            title={IMLocalized("date")}
            width="48%"
          />

          <NoGradientButton
            onPress={showTimepicker}
            title={IMLocalized("time")}
            width="48%"
          />
        </View>
      )}
      {isAndroid && show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeAndroid}
          />
        </View>
      )}
      {isAndroid && date && (
        <View>
          <TextInput
            editable={false}
            value={date.toString().substring(0, 21)}
            width="100%"
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
