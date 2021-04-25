import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UniversityPointer from "./../UniversityPointer";

import routes from "../../navigation/routes";

import { VerticalCard } from "../card";

function FindGroup({ groups, navigation, getSubscriptions }) {
  const baseUrl = "https://pcm-api.herokuapp.com";
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={{ overflow: "visible", height: 400 }}
        data={groups}
        keyExtractor={(g) => g.id.toString()}
        renderItem={({ item }) => (
          <VerticalCard
            {...item}
            image={
              item.image
                ? { uri: baseUrl + item.image }
                : require("../../assets/3.jpg")
            }
            key={item.index}
            onPress={() =>
              navigation.navigate(routes.GROUP_DETAILS, {
                ...item,
                getSubscriptions,
              })
            }
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
