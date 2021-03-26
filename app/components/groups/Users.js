import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import Member from "./Member";
import routes from "../../navigation/routes";

import Title from "./../Title";

function Users({ list, navigation, groupId, title }) {
  const baseUrl = "https://pcm-api.herokuapp.com";
  const defautImage = require("./../../assets/user.png");

  return (
    <ScrollView style={styles.usersContainer}>
      <Title>{title}</Title>
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
                groupId: groupId,
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
  usersContainer: {
    overflow: "scroll",
    paddingVertical: 10,
    zIndex: -1,
  },
});

export default Users;
