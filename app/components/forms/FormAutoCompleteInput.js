import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import Autocomplete from "react-native-autocomplete-input";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "./../../config";

function AppFormAutoCompleteInput({
  name,
  items,
  text,
  placeholder = "",
  onChangeText,
  setQuery,
  hideResults,
  setHideResults,
}) {
  const { errors, touched, setFieldValue } = useFormikContext();

  return (
    <>
      <Autocomplete
        data={items}
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.autocompleteContainer}
        inputContainerStyle={{ borderColor: colors.light, borderRadius: 10 }}
        listStyle={styles.listStyle}
        hideResults={hideResults}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setFieldValue(name, item.id);
                setQuery(item.name);
                setHideResults(true);
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    backgroundColor: colors.light,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderColor: colors.light,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 7,
    zIndex: 1,
  },
  listStyle: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
    borderColor: colors.light,
    backgroundColor: colors.primary,
  },
});

export default AppFormAutoCompleteInput;
