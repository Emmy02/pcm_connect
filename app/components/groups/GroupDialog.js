import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";

import { IMLocalized } from "./../../config/IMLocalized";

function GroupDialog({ visible, onAccept, onCancel }) {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Input
        placeholder={"ád"}
        numberOfLines={4}
        style={{
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      />
      <Dialog.Button label={IMLocalized("accept")} onPress={onAccept} />
      <Dialog.Button label={IMLocalized("cancel")} onPress={onCancel} />
    </Dialog.Container>
  );
}

const styles = StyleSheet.create({});

export default GroupDialog;
