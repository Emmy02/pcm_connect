import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
  Keyboard,
  ScrollView,
} from "react-native";

import colors from "../../config/colors";

import {
  RegisterForm,
  LoginForm,
  PasswordRecoveryForm,
  AuthFooter,
} from "../../components/auth";

import { IMLocalized } from "./../../config/IMLocalized";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../../components/Screen";

function AuthScreen({ navigation }) {
  const [activeFrom, setActiveFrom] = useState("login"); // login, register, passwordRecovery
  const [didKeyboardShow, setKeyboardShow] = useState(false);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          didKeyboardShow
            ? require("./../../assets/white-background.png")
            : require("./../../assets/background.png")
        }
        style={styles.background}
      >
        <Screen style={styles.screen}>
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <KeyboardAwareScrollView>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.logo}
                  source={require("./../../assets/logo.png")}
                />

                <Text style={styles.title}>PCM Connect</Text>

                <Text style={styles.subtitle}>
                  {IMLocalized("welcomeToTheFamily")}
                </Text>
              </View>

              {activeFrom === "register" && <RegisterForm />}
              {activeFrom === "login" && <LoginForm />}
              {activeFrom === "passwordRecovery" && <PasswordRecoveryForm />}
            </KeyboardAwareScrollView>
          </ScrollView>
          {!didKeyboardShow && (
            <AuthFooter activeFrom={activeFrom} setActiveFrom={setActiveFrom} />
          )}
        </Screen>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    resizeMode: "cover",
    zIndex: -1,
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  contentContainer: {
    paddingTop: "20%",
    paddingHorizontal: 10,
  },
  logo: {
    width: 96,
    height: 68,
    overflow: "visible",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 10,
    color: colors.secondary,
  },
  subtitle: {
    color: colors.medium,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AuthScreen;
