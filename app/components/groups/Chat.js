import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import Message from "./Message";
import { colors, defaultStyles } from "../../config";

import { SubmitButton, FormField, Form } from "./../forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Message"),
});

function Chat({ messages }) {
  const defautImage = require("./../../assets/user.png");
  const baseUrl = "https://pcm-api.herokuapp.com";
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}></View>
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <Message
            {...item}
            avatar={item.avatar ? { uri: baseUrl + item.avatar } : defautImage}
            onPress={() => {}}
            key={"group-chat-" + index}
          />
        )}
      />
      <View style={styles.chatFooter}>
        <Form
          initialValues={{ message: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="message"
            name="message"
            placeholder="Type your message"
            textContentType="none"
          />
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    overflow: "visible",
    borderRadius: 20,
    backgroundColor: "#fff",
    height: "80%",
    bottom: 70,
    left: 10,
    position: "absolute",
    padding: 10,
    ...defaultStyles.shadows,
  },
  chatHeader: {
    flexDirection: "row-reverse",
    marginVertical: 7,
    alignItems: "center",
  },
  headerText: {
    color: colors.secondary,
    marginHorizontal: 10,
  },
  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});

export default Chat;
