import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
} from "react-native";

import colors from "../../config/colors";

import {
  RegisterForm,
  LoginForm,
  PasswordRecoveryForm,
  AuthFooter,
} from "../../components/auth";

import { IMLocalized } from "./../../config/IMLocalized";

function AuthScreen({ navigation }) {
  const [activeFrom, setActiveFrom] = useState("login"); // login, register, passwordRecovery

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./../../assets/background.png")}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.logo}
              source={require("./../../assets/logo.png")}
            />
            {activeFrom !== "passwordRecovery" && (
              <Text style={styles.title}>PCM Connect</Text>
            )}
            {activeFrom !== "passwordRecovery" && (
              <Text style={styles.subtitle}>
                {IMLocalized("welcomeToTheFamily")}
              </Text>
            )}
            {activeFrom === "register" && <RegisterForm />}
            {activeFrom === "login" && <LoginForm />}
            {activeFrom === "passwordRecovery" && <PasswordRecoveryForm />}
          </View>
          <AuthFooter activeFrom={activeFrom} setActiveFrom={setActiveFrom} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "contain",
    justifyContent: "center",
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "20%",
    paddingHorizontal: 20,
  },
  logo: {
    width: 96,
    height: 68,
    overflow: "visible",
  },
  title: {
    fontSize: 34,
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
