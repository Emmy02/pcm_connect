import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import NoticesScreen from "./../screens/notices/NoticesScreen";
import NoticeDetailScreen from "./../screens/notices/NoticeDetailScreen";

const Stack = createStackNavigator();

const NoticeNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.NOTICES} component={NoticesScreen} />
    <Stack.Screen name={routes.NOTICE_DETAILS} component={NoticeDetailScreen} />
  </Stack.Navigator>
);

export default NoticeNavigator;
