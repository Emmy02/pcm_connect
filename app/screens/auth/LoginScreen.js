import React from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import colors from "../../config/colors";

import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LogInScreen() {
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
            <Text style={styles.title}>PCM Connect</Text>
            <Text style={styles.subtitle}>Welcome to the Family</Text>

            <Form
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="Login" color="primary" />
            </Form>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.buttons} onPress={() => {}}>
              <View>
                <Text style={styles.signup}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => {}}>
              <View>
                <Text style={styles.passwordRecovery}>Password Recovery</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    paddingTop: 100,
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
    marginVertical: 10,
    color: colors.secondary,
  },
  subtitle: {
    color: colors.medium,
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  passwordRecovery: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "right",
  },
  signup: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: "400",
  },
  buttons: {
    width: "50%",
    zIndex: 1,
  },
});

export default LogInScreen;
