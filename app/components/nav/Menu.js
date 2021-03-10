import React from "react";

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
    title: "Notices",
  },
  {
    id: 2,
    title: "Support",
  },
  {
    id: 3,
    title: "Privacy Polices",
  },
  {
    id: 4,
    title: "About PCM Connect",
  },
];

function Menu({ role }) {
  return (
    <View style={styles.menuContainer}>
      <FlatList
        data={menuList}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity>
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
