import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UniversityPointer from "./../UniversityPointer";

import routes from "../../navigation/routes";

import { VerticalCard } from "../card";

function FindGroup({ groups, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={{ overflow: "visible" }}
        data={groups}
        keyExtractor={(g) => g.id.toString()}
        renderItem={({ item }) => (
          <VerticalCard
            {...item}
            image={require("../../assets/1.jpg")}
            key={item.index}
            onPress={() => navigation.navigate(routes.GROUP_DETAILS, item)}
            controls={
              <UniversityPointer university={{ name: item.university.name }} />
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default FindGroup;
