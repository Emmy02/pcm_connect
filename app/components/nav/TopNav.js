import React, { useState } from "react";

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { colors, defaultStyles } from "./../../config";

import SvgUri from "react-native-svg-uri";

import Menu from "./Menu";

function TopNav({ image, role, controls }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.navContainer}>
      <View>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <View style={styles.menu}>
            <SvgUri
              width="28"
              height="28"
              style={styles.icon}
              source={require("./../../assets/menu_alt_03.svg")}
            />
          </View>
        </TouchableOpacity>
        {showMenu && <Menu />}
      </View>

      {controls && <View style={styles.controls}>{controls}</View>}

      <TouchableOpacity>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 44,
    overflow: "visible",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  menu: {
    backgroundColor: "#fff",
    height: 44,
    width: 44,
    borderRadius: 22,
    ...defaultStyles.shadows,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 22,
    height: 44,
    width: 44,
    ...defaultStyles.shadows,
  },
});

export default TopNav;
