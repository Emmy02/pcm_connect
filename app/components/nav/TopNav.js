import React, { useState, useEffect } from "react";

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { defaultStyles } from "./../../config";

import SvgUri from "react-native-svg-uri";

import Menu from "./Menu";
import routes from "../../navigation/routes";

import useAccount from "./../../account/useAccount";

function TopNav({ controls, navigation }) {
  const { profile } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  const baseUrl = "https://pcm-api.herokuapp.com";

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
        {showMenu && (
          <Menu
            navigation={navigation}
            roles={profile?.roles}
            setShowMenu={setShowMenu}
          />
        )}
      </View>

      {controls && <View style={styles.controls}>{controls}</View>}

      <TouchableOpacity onPress={() => navigation.navigate(routes.PROFILE)}>
        {profile?.avatar && (
          <Image
            style={styles.image}
            source={{ uri: baseUrl + profile?.avatar }}
          />
        )}
        {!profile?.avatar && (
          <Image
            style={styles.image}
            source={require("./../../assets/user.png")}
          />
        )}
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
  },
});

export default TopNav;
