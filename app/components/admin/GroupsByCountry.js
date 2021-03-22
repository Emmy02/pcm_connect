import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../config";
import Title from "../Title";

function GroupsByCountry({ universities_by_country }) {
  if (!universities_by_country) return <View></View>;

  const content = Object.keys(universities_by_country).map((country, index) => {
    return {
      name: country,
      count: universities_by_country[country],
    };
  });
  return (
    <View style={styles.groupsByCountryContainer}>
      <Title>Groups by country</Title>
      {content.map((countryRow, index) => (
        <View style={styles.textContainer} key={index}>
          <Text style={styles.count}>{countryRow.name}</Text>
          <Text style={styles.count}>{countryRow.count}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  groupsByCountryContainer: {
    width: "100%",
  },
  textContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  count: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.medium,
  },
});

export default GroupsByCountry;
