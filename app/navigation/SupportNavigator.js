import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import ContactScreen from "./../screens/support/ContactScreen";
import PrivacyAndTermsOfUseScreen from "../screens/support/PrivacyAndTermsOfUseScreen";
import SupportFormScreen from "./../screens/support/SupportFormScreen";
import SupportTicketsScreen from "./../screens/support/SupportTicketsScreen";

const Stack = createStackNavigator();

const SupportNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.CONTACT} component={ContactScreen} />
    <Stack.Screen
      name={routes.PRIVACY_AND_TERMS_OF_USE}
      component={PrivacyAndTermsOfUseScreen}
    />
    <Stack.Screen name={routes.SUPPORT_FORM} component={SupportFormScreen} />
    <Stack.Screen
      name={routes.SUPPORT_TICKETS}
      component={SupportTicketsScreen}
    />
  </Stack.Navigator>
);

export default SupportNavigator;
