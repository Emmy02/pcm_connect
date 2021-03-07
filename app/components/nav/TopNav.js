import React, { useState } from "react";

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import colors from "./../../config/colors";

import SvgUri from "react-native-svg-uri";

import Menu from "./Menu";

function TopNav({ image, role, controls, ...otherProps }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.navContainer}>
      <View>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <View style={styles.menu}>
            <SvgUri
              width="28"
              height="28"
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
    width: "100%",
    height: 44,
    overflow: "visible",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    height: 44,
    width: 44,
    borderRadius: 22,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 22,
    height: 44,
    width: 44,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
});

export default TopNav;
