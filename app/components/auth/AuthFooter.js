import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "./../../config/colors";

function AuthFooter({ activeFrom, setActiveFrom }) {
  return (
    <View style={styles.footerContainer}>
      {activeFrom === "login" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("register")}
          >
            <Text style={styles.firstOption}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("passwordRecovery")}
          >
            <Text style={styles.secondOption}>Password Recovery</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeFrom === "passwordRecovery" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("register")}
          >
            <Text style={styles.firstOption}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("login")}
          >
            <Text style={styles.secondOption}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeFrom === "register" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("passwordRecovery")}
          >
            <Text style={styles.firstOption}>Password Recovery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setActiveFrom("login")}
          >
            <Text style={styles.secondOption}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  footer: {
    flexDirection: "row-reverse",
  },
  firstOption: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  secondOption: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    width: "50%",
    zIndex: 1,
  },
});

export default AuthFooter;
