import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";

import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IMLocalized } from "./../../config/IMLocalized";
import { NavBack } from "./../../components/nav";

import noticesApi from "./../../api/notices";

import { getRecordId } from "./../../utility/utils";
import ActivityIndicator from "./../../components/ActivityIndicator";

import dayjs from "dayjs";

function NoticeDetailScreen({ navigation, route }) {
  const [notice, setNotice] = useState({ attendants: [] });
  const [loading, setLoading] = useState(false);

  const {
    id,
    userId,
    title,
    description,
    expiration_date,
    subtitle,
    place,
    image_src,
  } = route.params;

  const participate = async () => {
    const params = {
      status: 0,
      user_id: userId,
      activity_type: "Notice",
      activity_id: id,
    };

    setLoading(true);
    const result = await noticesApi.addAttendant(params);
    setLoading(false);

    if (result.ok) getNotice();
  };

  const notParticipate = async (attendant) => {
    setLoading(true);
    const results = await noticesApi.destroyAttendant(attendant);
    setLoading(false);

    if (results.ok) getNotice();
  };

  const getNotice = async () => {
    setLoading(true);
    const results = await noticesApi.getNotice(id);
    setLoading(false);

    if (results.ok) setNotice(results.data);
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <View style={styles.mainScreen}>
      <Image source={{ uri: image_src }} style={styles.image} blurRadius={1} />

      <Screen style={styles.screen}>
        <NavBack onPress={() => navigation.goBack()} />

        <Title>{title}</Title>
        <Text>{subtitle}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {description}
        </Text>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"link-variant"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{place}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"clock-time-five-outline"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text> {dayjs(expiration_date).format(" h:mm A")}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"calendar"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text> {dayjs(expiration_date).format("ddd, MMM D, YYYY")}</Text>
        </View>

        <View style={styles.listContainer}>
          <MaterialCommunityIcons
            name={"account-group-outline"}
            size={24}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>
            {notice.attendants.length} {IMLocalized("peopleGoing")}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {!notice.attendants.some(
            (attendant) => attendant.user_id === userId
          ) && (
            <NoGradientButton
              title={IMLocalized("participate")}
              color="primary"
              onPress={participate}
            />
          )}
          {notice.attendants.some(
            (attendant) => attendant.user_id === userId
          ) && (
            <NoGradientButton
              title={IMLocalized("notParticipate")}
              color="danger"
              onPress={() =>
                notParticipate(
                  getRecordId(userId, "user_id", notice.attendants)
                )
              }
            />
          )}
        </View>
        <ActivityIndicator visible={loading} />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  screen: {
    padding: 10,
  },
  image: {
    height: 230,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 10,
    width: "100%",
  },
  description: {
    paddingBottom: 10,
    color: colors.medium,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    paddingRight: 10,
  },
  goBack: {
    marginTop: 30,
    position: "absolute",
    width: "100%",
  },
});

export default NoticeDetailScreen;
