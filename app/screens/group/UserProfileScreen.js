import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { NavBack } from "./../../components/nav";
import Title from "./../../components/Title";
import { NoGradientButton } from "./../../components/button";
import { IMLocalized } from "./../../config/IMLocalized";
import { LinearGradient } from "expo-linear-gradient";

import Screen from "./../../components/Screen";
import dayjs from "dayjs";

import colors from "../../config/colors";
import SvgUri from "react-native-svg-uri";
import memberApi from "./../../api/members";
import requestApi from "./../../api/requests";
import accountApi from "./../../api/account";

import useAccount from "./../../account/useAccount";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

function UserProfileScreen({ navigation, route }) {
  const { getRoles, profile } = useAccount();
  const { roles, resources } = getRoles(profile.roles);

  const {
    updated,
    setUpdated,
    isRequest,
    message,
    groupId,
    avatar,
    id,
    is_owner,
    user: {
      email,
      user_profile: {
        age,
        career_name,
        cover,
        first_name,
        last_name,
        is_adventist,
        created_at,
      },
    },
  } = route.params;

  const user_id = route.params.user.id;

  const isCurrentGroupOwner =
    roles.isOwner && resources.ownerGroupId === groupId;

  const itIsSelf = route.params.user.id === profile.id;

  const removeMember = async (groupId, memberId) => {
    Alert.alert(
      IMLocalized("confirmation"),
      IMLocalized("areYouSure"),
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => destroyMember(groupId, memberId),
        },
      ],
      { cancelable: false }
    );
  };

  const destroyMember = async (groupId, memberId) => {
    const result = await memberApi.destroyMember(groupId, memberId);

    if (result.ok) {
      setUpdated(!updated);
      navigation.goBack();
    }
  };

  const rejectRequest = async (groupId, requestId) => {
    const result = await requestApi.updateRequest(groupId, requestId, {
      status: 2,
      id: requestId,
      user_id,
    });

    if (result.ok) {
      setUpdated(!updated);
      navigation.goBack();
    }
  };

  const acceptRequest = async (groupId, requestId) => {
    const result = await requestApi.updateRequest(groupId, requestId, {
      status: 1,
      id: requestId,
      user_id,
    });

    if (result.ok) createMember(groupId, user_id);
  };

  const createMember = async (groupId, userId) => {
    const result = await memberApi.addMember(groupId, {
      group_id: groupId,
      user_id: userId,
    });

    if (result.ok) {
      setUpdated(!updated);
      navigation.goBack();
    }
  };

  const report = () => {
    Alert.alert(
      IMLocalized("confirmation"),
      IMLocalized("areYouSure"),
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => createReport(),
        },
      ],
      { cancelable: false }
    );
  };

  const createReport = async () => {
    const params = {
      created_by: profile.id,
      status: 0,
      user_id: route.params.user.id,
    };
    const results = await accountApi.addReport(params);
    if (results.ok) {
      setUpdated(!updated);
      alert("Reported");
    }
  };

  const setOwner = async () => {
    const result = await memberApi.setOwnerRole(groupId, id);

    if (result.ok) {
      setUpdated(!updated);
      alert("Complete");
      navigation.goBack();
    }
  };

  const setMember = async () => {
    const result = await memberApi.setMemberRole(groupId, id);

    if (result.ok) {
      setUpdated(!updated);
      alert("Completed");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.mainScreen}>
      <Image
        source={require("../../assets/3.jpg")}
        style={styles.image}
        blurRadius={7}
      />

      <Screen style={styles.screen}>
        <View style={styles.backButtonContainer}>
          <NavBack onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.card}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            locations={[1, 0]}
            end={{ x: 1, y: 1 }}
            colors={[colors.primary, colors.secondary]}
            style={styles.gradient}
          >
            <View style={styles.userInfoContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateWraper}>
                  <Text style={styles.date}>
                    {dayjs(created_at).format("ddd, MMM D, YYYY h:mm A")}
                  </Text>
                </View>
              </View>
              <View style={styles.primaryInfoContainer}>
                <Image style={styles.avatar} source={avatar} />
                <View style={styles.primaryInfo}>
                  <Text
                    numberOfLines={1}
                    style={[styles.fullName, styles.text]}
                  >
                    {first_name} {last_name}
                  </Text>
                  <Text style={[styles.email, styles.text]}>{email}</Text>
                  <Text numberOfLines={3} style={[styles.cover, styles.text]}>
                    {cover}
                  </Text>
                </View>
              </View>
              <View style={styles.secondaryInfo}>
                <View style={[styles.centered, styles.ageContainer]}>
                  <Text style={[styles.age, styles.text]}>{age}</Text>
                  <Text style={styles.text}>{IMLocalized("yearsOld")}</Text>
                </View>
                <View style={[styles.centered, styles.adventistContainer]}>
                  <Text style={[styles.adventist, styles.text]}>
                    {is_adventist ? "adventist" : "non-adventist"}
                  </Text>
                </View>
                <View style={[styles.centered, styles.careerContainer]}>
                  <Text style={[styles.career, styles.text]}>
                    {career_name}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.secondaryDataContainer}>
          {message && (
            <View style={styles.messageContainer}>
              <SvgUri
                width="70"
                height="70"
                style={styles.svg}
                source={require("./../../assets/quotes.svg")}
              />
              <View>
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>
          )}
          {isCurrentGroupOwner && !isRequest && !itIsSelf && (
            <View style={styles.actionsContainer}>
              <Title>{IMLocalized("adminActions")}</Title>
              <View style={styles.firstRow}>
                <View style={{ width: "48%" }}>
                  <NoGradientButton
                    title={IMLocalized("remove")}
                    color="danger"
                    onPress={() => removeMember(groupId, id)}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <NoGradientButton
                    title={IMLocalized("report")}
                    color="clear"
                    onPress={() => report()}
                  />
                </View>
              </View>
              <View style={styles.lastRow}>
                {is_owner && (
                  <NoGradientButton
                    title={IMLocalized("makeMember")}
                    color="medium"
                    onPress={() => setMember()}
                  />
                )}
                {!is_owner && (
                  <NoGradientButton
                    title={IMLocalized("makeAdmin")}
                    color="primary"
                    onPress={() => setOwner()}
                  />
                )}
              </View>
            </View>
          )}
          {isCurrentGroupOwner && isRequest && (
            <View style={styles.actionsContainer}>
              <Title>{IMLocalized("adminActions")}</Title>
              <View style={styles.firstRow}>
                <View style={{ width: "48%" }}>
                  <NoGradientButton
                    title={IMLocalized("reject")}
                    color="danger"
                    onPress={() => rejectRequest(groupId, id)}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <NoGradientButton
                    title={IMLocalized("accept")}
                    color="primary"
                    onPress={() => acceptRequest(groupId, id)}
                  />
                </View>
              </View>
            </View>
          )}

          {itIsSelf && <View style={styles.noActions}></View>}
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    width: "100%",
    position: "absolute",
    top: 0,
    height: "30%",
  },
  mainScreen: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.white,
  },
  card: {
    width: "100%",
    borderRadius: 30,
  },
  centered: {
    alignItems: "center",
  },
  gradient: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%",
  },
  dateContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  dateWraper: {
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,.5)",
    width: "60%",
  },
  date: {
    width: "100%",
    padding: 7,
    textAlign: "center",
    color: colors.white,
  },
  primaryInfoContainer: {
    flexDirection: "row",
    paddingTop: 10,
    width: "75%",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  primaryInfo: {
    paddingHorizontal: 10,
    width: "100%",
  },
  text: {
    color: colors.white,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 3,
  },
  email: {
    paddingBottom: 5,
  },
  cover: {
    width: "70%",
  },
  secondaryInfo: {
    flexDirection: "row",
    marginVertical: 30,
    width: "100%",
  },
  age: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  adventist: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  career: {
    textAlign: "center",
  },
  ageContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  adventistContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  careerContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryDataContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  messageContainer: {
    marginTop: 30,
    flex: 1,
  },
  message: {
    height: 100,
    textAlign: "center",
  },
  backButtonContainer: {
    padding: 10,
    position: "absolute",
    zIndex: 999,
  },
  noActions: {
    height: "10%",
  },
  actionsContainer: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 100,
  },
});

export default UserProfileScreen;
