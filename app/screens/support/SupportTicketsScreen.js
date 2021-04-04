import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ScrollView } from "react-native";
import { OutLineButton } from "../../components/button";

import Screen from "../../components/Screen";
import { colors } from "./../../config";

import { IMLocalized } from "./../../config/IMLocalized";

import ticketsApi from "./../../api/tickets";
import useApi from "./../../hooks/useApi";

import { TicketCard } from "./../../components/card";
import routes from "../../navigation/routes";

import { NavBack } from "./../../components/nav";

function SupportTicketsScreen({ navigation, route }) {
  const [created, setCreated] = useState(false);
  const getMyTicketsApi = useApi(ticketsApi.getMyTickets);

  useEffect(() => {
    getMyTicketsApi.request();
  }, [created]);

  return (
    <Screen style={styles.screen}>
      <NavBack onPress={() => navigation.goBack()} />

      <ScrollView>
        <OutLineButton
          width="50%"
          title={IMLocalized("reportAnIssueButton")}
          onPress={() =>
            navigation.navigate(routes.SUPPORT_FORM, { setCreated, created })
          }
        />

        <View>
          <FlatList
            style={{ overflow: "visible" }}
            data={getMyTicketsApi.data}
            keyExtractor={(ticket) => ticket.id.toString()}
            renderItem={({ item }) => <TicketCard {...item} key={item.id} />}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    zIndex: -1,
    padding: 10,
    backgroundColor: colors.background,
  },
});

export default SupportTicketsScreen;
