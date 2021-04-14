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
import accountApi from "./../../api/account";
import useAccount from "./../../account/useAccount";

const seeds = [
  { id: 1, title: "DIA" },
  { id: 2, title: "North Mexican Conference" },
  { id: 3, title: "Northen Adventist Association" },
];

import noticesApi from "./../../api/notices";
import useApi from "./../../hooks/useApi";

import { IMLocalized } from "./../../config/IMLocalized";

function NoticesScreen({ navigation }) {
  const { profile, getRoles } = useAccount();
  const { roles, resources } = getRoles(profile?.roles);

  const [activeFilter, setActiveFilter] = useState(1);

  const [seeds, setSeeds] = useState([]);

  const seedSetup = () => {
    if (roles.isMember)
      setSeeds([
        {
          id: 1,
          title: profile.adventist_division?.name || "DIA",
        },
        {
          id: 2,
          title: profile.adventist_union?.name || "Your Union",
        },
        {
          id: 3,
          title: profile.adventist_association?.name || "Your Association",
        },
      ]);
  };

  const getNoticesApi = useApi(noticesApi.getNotices);
  const getAdventistUnionNoticesApi = useApi(
    noticesApi.getAdventistUnionNotices
  );
  const getAdventistAssociationNoticesApi = useApi(
    noticesApi.getAdventistAssociationNotices
  );

  useEffect(() => {
    seedSetup();
    getNoticesApi.request();
    getAdventistUnionNoticesApi.request();
    getAdventistAssociationNoticesApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <TopNav image={require("../../assets/3.jpg")} navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        {getNoticesApi.error && (
          <>
            <Text> Couldn't retrieve Notices.</Text>
            <OutLineButton title="Retry" onPress={getNoticesApi.request} />
          </>
        )}
        <View style={styles.filterList}>
          <Title>{IMLocalized("notices")}</Title>
          <FlatList
            style={{ overflow: "visible" }}
            data={seeds}
            horizontal
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item, index }) => (
              <Seed
                activeFilter={activeFilter}
                setActiveFilter={() => setActiveFilter(item.id)}
                active={activeFilter === item.id}
                {...item}
                key={"notice-seed-" + index}
              />
            )}
          />
        </View>
        {activeFilter === 1 && (
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
                      title={IMLocalized("seeDetailsButton")}
                      onPress={() =>
                        navigation.navigate(routes.NOTICE_DETAILS, {
                          ...item,
                          userId: profile.id,
                        })
                      }
                    />
                  }
                />
              )}
            />
          </View>
        )}
        {activeFilter === 1 && (
          <View style={styles.noticesList}>
            <FlatList
              data={getAdventistUnionNoticesApi.data}
              keyExtractor={(listing) => listing.id.toString()}
              renderItem={({ item, index }) => (
                <Presenter
                  reverse={index % 2}
                  {...item}
                  key={"notice-presenter-" + index}
                  controls={
                    <OutLineButton
                      title={IMLocalized("seeDetailsButton")}
                      onPress={() =>
                        navigation.navigate(routes.NOTICE_DETAILS, {
                          ...item,
                          userId: profile.id,
                        })
                      }
                    />
                  }
                />
              )}
            />
          </View>
        )}
        {activeFilter === 2 && (
          <View style={styles.noticesList}>
            <FlatList
              data={getAdventistAssociationNoticesApi.data}
              keyExtractor={(listing) => listing.id.toString()}
              renderItem={({ item, index }) => (
                <Presenter
                  reverse={index % 2}
                  {...item}
                  key={"notice-presenter-" + index}
                  controls={
                    <OutLineButton
                      title={IMLocalized("seeDetailsButton")}
                      onPress={() =>
                        navigation.navigate(routes.NOTICE_DETAILS, {
                          ...item,
                          userId: profile.id,
                        })
                      }
                    />
                  }
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
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
