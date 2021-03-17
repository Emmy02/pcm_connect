import React from "react";

import routes from "./../../navigation/routes";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

import { colors, defaultStyles } from "./../../config";

const menuList = [
  {
    id: 1,
    title: "Dashboard",
    route: routes.DASHBOARD,
  },
  {
    id: 2,
    title: "Notices",
    route: routes.NOTICES,
  },
  {
    id: 3,
    title: "About PCM Connect",
    route: routes.CONTACT,
  },
  {
    id: 4,
    title: "Stats",
    route: routes.ADMIN_DASHBOARD,
  },
];

function Menu({ navigation }) {
  return (
    <View style={styles.menuContainer}>
      <FlatList
        style={{ zIndex: 1 }}
        data={menuList}
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
});

export default Menu;
