import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Presenter from "./../../components/Presenter";
import Title from "./../../components/Title";
import Seed from "./../../components/Seed";

import { OutLineButton } from "./../../components/button";

import { TopNav } from "./../../components/nav";
import routes from "../../navigation/routes";

const seeds = [
  { id: 1, title: "DIA" },
  { id: 2, title: "North Mexican Conference" },
  { id: 3, title: "Northen Adventist Association" },
];

import noticesApi from "./../../api/notices";

import useApi from "./../../hooks/useApi";

function NoticesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState(1);

  const getNoticesApi = useApi(noticesApi.getNotices);

  useEffect(() => {
    getNoticesApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <TopNav
        image={require("../../assets/avatar-3.png")}
        navigation={navigation}
      />
      <ScrollView style={styles.scrollView}>
        {getNoticesApi.error && (
          <>
            <Text> Couldn't retrieve the groups.</Text>
            <OutLineButton title="Retry" onPress={getNoticesApi.request} />
          </>
        )}
        <View style={styles.filterList}>
          <Title>Notices</Title>
          <FlatList
            style={{ overflow: "visible" }}
            data={seeds}
            horizontal
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <Seed
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                active={activeFilter === item.id}
                {...item}
                key={"notice-seed-" + index}
              />
            )}
          />
        </View>
        <View style={styles.noticesList}>
          <FlatList
            data={getNoticesApi.data}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <Presenter
                reverse={index % 2}
                {...item}
                key={"notice-presenter-" + index}
                controls={
                  <OutLineButton
                    title="See Details"
                    onPress={() => navigation.navigate(routes.NOTICE_DETAILS)}
                  />
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
    padding: 10,
    backgroundColor: colors.light,
  },
  scrollView: {
    zIndex: -1,
  },
  filterList: {
    marginBottom: 30,
    overflow: "visible",
    zIndex: -1,
  },
  noticesList: {
    zIndex: -1,
  },
});

export default NoticesScreen;
