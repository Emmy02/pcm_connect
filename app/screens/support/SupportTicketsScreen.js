import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { OutLineButton } from "../../components/button";

import Screen from "../../components/Screen";
import { colors } from "./../../config";

import { IMLocalized } from "./../../config/IMLocalized";

import ticketsApi from "./../../api/tickets";
import useApi from "./../../hooks/useApi";

import { TicketCard } from "./../../components/card";
import routes from "../../navigation/routes";

function SupportTicketsScreen({ navigation }) {
  const getMyTicketsApi = useApi(ticketsApi.getMyTickets);
  useEffect(() => {
    getMyTicketsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <OutLineButton
        width="50%"
        title={IMLocalized("reportAnIssueButton")}
        onPress={() => navigation.navigate(routes.SUPPORT_FORM)}
      />

      <View>
        <FlatList
          style={{ overflow: "visible" }}
          data={getMyTicketsApi.data}
          keyExtractor={(ticket) => ticket.id.toString()}
          renderItem={({ item }) => <TicketCard {...item} key={item.id} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    zIndex: -1,
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default SupportTicketsScreen;
