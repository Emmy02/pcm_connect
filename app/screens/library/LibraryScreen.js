import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Title from "./../../components/Title";

import { TopNav } from "./../../components/nav";
import routes from "../../navigation/routes";

import { IMLocalized } from "./../../config/IMLocalized";

import libraryApi from "./../../api/library";

import useApi from "./../../hooks/useApi";

import ActivityIndicator from "./../../components/ActivityIndicator";

import Article from "./../../components/Article";

import useAccount from "./../../account/useAccount";

function LibraryScreen({ navigation }) {
  const { profile } = useAccount();
  const getPostsApi = useApi(libraryApi.getPosts);

  useEffect(() => {
    getPostsApi.request();
    return () => {};
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={{ padding: 10 }}>
        <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
        <ActivityIndicator visible={getPostsApi.loading} />
      </View>

      <ScrollView style={{ zIndex: -1 }}>
        <Title style={{ paddingHorizontal: 10 }}>
          {IMLocalized("articles")}
        </Title>
        <View style={styles.articlesContainer}>
          <FlatList
            horizontal
            style={{ overflow: "visible" }}
            data={getPostsApi.data}
            keyExtractor={(g) => g.id.toString()}
            renderItem={({ item }) => (
              <Article
                {...item}
                onPress={() =>
                  navigation.navigate(routes.ARTICLE_VIEW, {
                    userId: profile.id,
                    id: item.id,
                  })
                }
              />
            )}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    zIndex: -1,
    flex: 1,
    backgroundColor: colors.background,
    overflow: "visible",
  },
  articlesContainer: {
    backgroundColor: "#f6fbff",
    padding: 10,
  },
});

export default LibraryScreen;
