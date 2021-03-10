import React from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";

import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../components/forms";
import { NoGradientButton } from "./../../components/button";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function PasswordRecoveryScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/Rectangle-42.png")}
        style={styles.image2}
      />
      <Image
        source={require("./../../assets/Rectangle-41.png")}
        style={styles.image1}
      />
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
              keyboardType="email-address"
              name="email"
              placeholder=""
              textContentType="emailAddress"
            />
            <View style={styles.resetCode}>
              <View style={styles.resetCodeField}>
                <FormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  name="secret-code"
                  placeholder="Tyoe your Secret Code"
                  textContentType="postalCode"
                />
              </View>
              <View style={styles.noGradientButton}>
                <NoGradientButton color="clear" title="Resend code" />
              </View>
            </View>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="new-password"
              placeholder="New Password"
              secureTextEntry
              textContentType="password"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="new-password"
              placeholder="Confirm new Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" color="primary" />
          </Form>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttons} onPress={() => {}}>
            <View>
              <Text style={styles.signup}>Log in</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {}}>
            <View>
              <Text style={styles.passwordRecovery}>Password Recovery</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Image
        source={require("./../../assets/Rectangle-44.png")}
        style={styles.image3}
      />
      <Image
        source={require("./../../assets/Rectangle-45.png")}
        style={styles.image4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  image1: {
    width: "25%",
    height: "25%",
    position: "absolute",
    left: 160,
    top: 0,
    overflow: "visible",
    zIndex: -1,
  },
  image2: {
    width: "25%",
    height: "25%",
    position: "absolute",
    left: 160,
    top: 0,
    overflow: "visible",
    zIndex: -1,
  },
  image3: {
    width: "25%",
    height: "25%",
    position: "absolute",
    right: 140,
    bottom: 0,
    overflow: "visible",
    zIndex: -1,
  },
  image4: {
    width: "25%",
    height: "25%",
    position: "absolute",
    right: 140,
    bottom: 0,
    overflow: "visible",
    zIndex: -1,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "25%",
    padding: 20,
  },
  logo: {
    width: 80,
    maxHeight: 80,
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
    bottom: 120,
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
  resetCode: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetCodeFields: {
    width: "80%",
  },
});

export default PasswordRecoveryScreen;
