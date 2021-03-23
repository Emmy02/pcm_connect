import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import Member from "./Member";
import routes from "./../../navigation/routes";

function Members({ list, navigation }) {
  const baseUrl = "https://pcm-api.herokuapp.com";
  const defautImage = require("./../../assets/user.png");

  return (
    <ScrollView style={styles.membersContainer}>
      <FlatList
        style={{ flex: 1 }}
        data={list}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <Member
            {...item.user}
            avatar={item.avatar ? { uri: baseUrl + item.avatar } : defautImage}
            onPress={() =>
              navigation.navigate(routes.USER_PROFILE_GROUP, {
                ...item.user,
                avatar: item.avatar
                  ? { uri: baseUrl + item.avatar }
                  : defautImage,
              })
            }
            key={"group-member-" + index}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  membersContainer: {
    overflow: "scroll",
    paddingVertical: 10,
    zIndex: -1,
  },
});

export default Members;
