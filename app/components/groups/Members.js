import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import Member from "./Member";
import routes from "./../../navigation/routes";

function Members({ list, navigation }) {
  return (
    <ScrollView style={styles.membersContainer}>
      <FlatList
        style={{ flex: 1 }}
        data={list}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item, index }) => (
          <Member
            name={item.name}
            email={item.email}
            image={item.image}
            onPress={() => navigation.navigate(routes.USER_PROFILE_GROUP)}
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
