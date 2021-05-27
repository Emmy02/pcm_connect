import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import likeApi from "./../api/likes";
import colors from "../config/colors";

import { IMLocalized } from "./../config/IMLocalized";

function LikeIndicatorComponent({ user_id, read_id, read_type, likes = [] }) {
  const [liked, setLiked] = useState(null);
  const [id, setId] = useState(null);

  if (likes && liked === null) {
    likes.map((like) => {
      if (user_id === like.user_id) {
        setId(like.id);
        setLiked(true);
      }
    });
  }

  const addLike = async () => {
    setLiked(true);

    const results = await likeApi.addLike({ user_id, read_id, read_type });
    if (!results.ok) return setLiked(false);

    setId(results.data.id);
  };

  const removeLike = async (id) => {
    await likeApi.removeLike({ id });
    setLiked(false);
  };

  return (
    <View style={styles.container}>
      {!liked && (
        <TouchableOpacity onPress={() => addLike()}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name={"thumb-up-outline"}
              size={40}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={{ paddingLeft: 10, color: colors.medium }}>
              <Text style={{ fontWeight: "bold" }}>{likes.length}</Text>{" "}
              {IMLocalized("likePeople")}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {liked && (
        <TouchableOpacity onPress={() => removeLike(id)}>
          <MaterialCommunityIcons
            name={"thumb-down-outline"}
            size={40}
            color={colors.danger}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: 100,
  },
});

export default LikeIndicatorComponent;
