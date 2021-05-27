import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import Constants from "expo-constants";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Title from "./../../components/Title";

import { NavBack } from "./../../components/nav";
import { IMLocalized } from "./../../config/IMLocalized";

import libraryApi from "./../../api/library";
import useApi from "./../../hooks/useApi";
import ActivityIndicator from "./../../components/ActivityIndicator";

import LikeIndicator from "./../../components/LikeIndicator";

import dayjs from "dayjs";

function ArticleViewScreen({ navigation, route }) {
  const { id, userId } = route.params;

  const getPostApi = useApi(libraryApi.getPost);

  useEffect(() => {
    getPostApi.request({ id });
    return () => {};
  }, []);

  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: getPostApi.data.image_src }}
        style={styles.image}
        blurRadius={1}
      />
      <NavBack style={styles.goBack} onPress={() => navigation.goBack()} />

      <Screen style={{ padding: 10 }}>
        <ScrollView style={styles.container}>
          <ActivityIndicator visible={getPostApi.loading} />
          <View style={styles.header}>
            <Text
              style={{
                textAlign: "left",
                width: "100%",
                color: colors.medium,
                fontSize: 16,
              }}
            >
              {dayjs(getPostApi.data.created_at).format("d/M/YYYY h:mm a")}
            </Text>
            <Title style={styles.title}>{getPostApi.data.title}</Title>

            <Text style={styles.text}>{getPostApi.data.body}</Text>

            <LikeIndicator
              user_id={userId}
              read_id={id}
              read_type="Post"
              likes={getPostApi.data.likes}
            />
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
                    uri:
                      "https://pcm-api.herokuapp.com" +
                      getPostApi.data.author?.avatar,
                  }}
                  style={styles.userAvatar}
                />
              </View>
              <View>
                <Text style={styles.userName}>
                  {getPostApi.data.author?.user_profile?.first_name +
                    " " +
                    getPostApi.data.author?.user_profile?.last_name}
                </Text>
                <Text style={styles.cover}>
                  {getPostApi.data.author?.user_profile?.cover}
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
