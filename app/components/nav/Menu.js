import React from "react";

import routes from "./../../navigation/routes";
import useAuth from "./../../auth/useAuth";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

import { colors, defaultStyles } from "./../../config";
import { IMLocalized } from "./../../config/IMLocalized";

const options = (roles = []) => {
  const isAdmin = roles.some((role) => role.name === "admin");
  let menu = [
    {
      id: 1,
      title: IMLocalized("home"),
      route: routes.DASHBOARD,
    },
    {
      id: 2,
      title: IMLocalized("notices"),
      route: routes.NOTICES,
    },
    {
      id: 3,
      title: "About PCM Connect",
      route: routes.CONTACT,
    },
  ];

  if (isAdmin)
    menu.push({
      id: 4,
      title: IMLocalized("Admin"),
      route: routes.ADMIN_DASHBOARD,
      isAdmin: roles.some((role) => role.name === "admin"),
    });

  return menu;
};

function Menu({ navigation, roles }) {
  const { logOut } = useAuth();

  return (
    <View style={styles.menuContainer}>
      <FlatList
        style={{ zIndex: 1 }}
        data={options(roles)}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.danger}>{IMLocalized("logOut")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 10,
    ...defaultStyles.shadows,
    backgroundColor: "#fff",
    position: "absolute",
    top: 60,
    width: 200,
    zIndex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  text: {
    paddingVertical: 7,
    fontSize: 16,
    zIndex: 1,
  },
  danger: {
    color: colors.danger,
  },
});

export default Menu;
