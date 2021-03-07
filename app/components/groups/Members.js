import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import Member from "./Member";

function Members({ list }) {
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
            onPress={() => {}}
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
  },
});

export default Members;
