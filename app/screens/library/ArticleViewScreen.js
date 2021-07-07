import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import Constants from "expo-constants";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Title from "./../../components/Title";

import { NavBack } from "./../../components/nav";
import { IMLocalized } from "./../../config/IMLocalized";

import libraryApi from "./../../api/library";
import likeApi from "./../../api/likes";
import visitApi from "./../../api/visits";

import ActivityIndicator from "./../../components/ActivityIndicator";

import LikeIndicator from "./../../components/LikeIndicator";

import dayjs from "dayjs";

function ArticleViewScreen({ navigation, route }) {
  const [data, setData] = useState({});
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likeId, setLikeId] = useState(null);
  const [names, setNames] = useState("");

  const { id, userId } = route.params;

  const addLike = async () => {
    setLiked(true);

    const results = await likeApi.addLike({
      user_id: userId,
      read_id: id,
      read_type: "Post",
    });
    if (!results.ok) return setLiked(false);

    setId(results.data.id);
  };

  const addVisit = async () => {
    try {
      await visitApi.addVisit({
        user_id: userId,
        entity_id: id,
        entity_type: "Post",
      });
    } catch (error) {
      console.log("error while adding Visit");
    }
  };

  const removeLike = async () => {
    await likeApi.removeLike({ id: likeId });
    setLiked(false);
  };

  const getRecords = async () => {
    const results = await libraryApi.getPost({ id });

    setLoading(false);

    if (!results.ok) return alert("error");

    const { likes, visits } = results.data;

    const isVisited = checkIfVisited(visits, userId);

    if (!isVisited) addVisit();

    let names = [];
    if (likes && liked === null) {
      likes.map((like) => {
        if (userId === like.user_id) {
          setLikeId(like.id);
          setLiked(true);
        }

        if (like.user) {
          if (like.user.first_name) names.push(like?.user?.first_name);
        }
      });

      setNames(names.join(","));
    }

    setData(results.data);
  };

  const checkIfVisited = (visits, id) => {
    return visits.some((visit) => visit.user_id === id);
  };

  useEffect(() => {
    getRecords();
    return () => {};
  }, [liked]);

  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: data.image_src }}
        style={styles.image}
        blurRadius={1}
      />
      <NavBack style={styles.goBack} onPress={() => navigation.goBack()} />

      <Screen style={{ padding: 10 }}>
        <ScrollView style={styles.container}>
          <ActivityIndicator visible={loading} />
          <View style={styles.header}>
            <Text
              style={{
                textAlign: "left",
                width: "100%",
                color: colors.medium,
                fontSize: 16,
              }}
            >
              {dayjs(data.created_at).format("d/M/YYYY h:mm a")}
            </Text>
            <Title style={styles.title}>{data.title}</Title>

            <Text style={styles.text}>{data.body}</Text>

            <LikeIndicator
              addLike={addLike}
              removeLike={removeLike}
              liked={liked}
              likes={data.likes}
              names={names}
            />
            {data.visits && (
              <View
                style={{ textAlign: "left", width: "100%", paddingTop: 15 }}
              >
                <Text>
                  {data.visits.length} {IMLocalized("views")}
                </Text>
              </View>
            )}

            <View style={{ textAlign: "left", width: "100%", paddingTop: 15 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: colors.medium,
                  fontWeight: "500",
                }}
              >
                {IMLocalized("writtenBy")}:
              </Text>
            </View>

            <View style={styles.authorContainer}>
              <View>
                <Image
                  source={{
                    uri: "https://pcm-api.herokuapp.com" + data.author?.avatar,
                  }}
                  style={styles.userAvatar}
                />
              </View>
              <View>
                <Text style={styles.userName}>
                  {data.author?.user_profile?.first_name +
                    " " +
                    data.author?.user_profile?.last_name}
                </Text>
                <Text style={styles.cover}>
                  {data.author?.user_profile?.cover}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 230,
  },
  title: {
    color: colors.secondary,
  },
  text: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "left",
  },
  authorContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
    borderTopColor: "rgba(0,0,0, .05)",
    borderTopWidth: 1,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0, .01)",
    borderRadius: 10,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 30,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: colors.medium,
    fontWeight: "bold",
  },
  cover: {
    fontWeight: "200",
  },
  goBack: {
    marginTop: Constants.statusBarHeight,
    position: "absolute",
    width: "100%",
    left: 10,
  },
});

export default ArticleViewScreen;
