import React from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AuthScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/Rectangle-42.png")}
        style={styles.image2}
      />
      <Image
        source={require("./../assets/Rectangle-41.png")}
        style={styles.image1}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.contentContainer}>
          <Image style={styles.logo} source={require("./../assets/logo.png")} />
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
            <SubmitButton title="Login" />
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

      <Image
        source={require("./../assets/Rectangle-44.png")}
        style={styles.image3}
      />
      <Image
        source={require("./../assets/Rectangle-45.png")}
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
});

export default AuthScreen;
