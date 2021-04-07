import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";

import { ActionCable, Cable } from "@kesha-antonov/react-native-action-cable";

import Message from "./Message";
import { colors, defaultStyles } from "../../config";

import { SubmitButton, FormField, Form } from "./../forms";
import { IMLocalized } from "./../../config/IMLocalized";

import messagesApi from "./../../api/messages";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "Too Short")
    .max(500, "Too Long")
    .required()
    .label("Message"),
});

function Chat({ messages, groupId, userId }) {
  const [didKeyboardShow, setKeyboardShow] = useState(false);
  const scrollView = useRef();

  const [mgs, setMgs] = useState(messages);

  const defautImage = require("./../../assets/user.png");
  const baseUrl = "https://pcm-api.herokuapp.com";

  const onReceived = (data) => {
    let newMessages = mgs;

    newMessages = newMessages.concat([data]);
    setMgs(newMessages);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    const actionCable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const cable = new Cable({});

    const channel = cable.setChannel(
      `group_chat_${groupId}_channel`,
      actionCable.subscriptions.create({
        channel: "GroupChatChannel",
        group_id: groupId,
      })
    );

    channel.on("received", onReceived);

    return () => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

      const channelName = `group_chat_${groupId}_channel`;
      const channel = cable.channel(channelName);

      if (channel) {
        channel.removeListener("received", onReceived);
        channel.unsubscribe();
        delete cable.channels[channelName];
      }
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };
  const handleSubmit = async ({ message }, { resetForm }) => {
    const params = {
      content: message,
      type: 0,
      user_id: userId,
    };

    const results = await messagesApi.addMessage(groupId, params);
    if (results.ok) resetForm();
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}></View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          {mgs.map((message, index) => (
            <Message
              {...message}
              avatar={
                message.avatar ? { uri: baseUrl + message.avatar } : defautImage
              }
              onPress={() => {}}
              key={"group-chat-" + index}
              me={message.user_id === userId}
            />
          ))}
        </ScrollView>

        <View
          style={[
            styles.chatFooter,
            { paddingBottom: didKeyboardShow ? 90 : 0 },
          ]}
        >
          <Form
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={true}
              keyboardType="default"
              name="message"
              placeholder={IMLocalized("typeYourMessageHere")}
              textContentType="none"
              width="80%"
            />

            <SubmitButton color="primary" title="Send" width="20%" />
          </Form>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    overflow: "visible",
    borderRadius: 20,
    backgroundColor: "#fff",
    height: "105%",
    bottom: 70,
    left: 10,
    position: "absolute",
    width: "100%",
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
    marginBottom: 0,
  },
});

export default Chat;
