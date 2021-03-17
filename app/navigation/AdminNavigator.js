import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import AdminDashboardScreen from "./../screens/admin/AdminDashboardScreen";
import GroupsValidationScreen from "./../screens/admin/GroupsValidationScreen";
import NoticeFormScreen from "./../screens/admin/NoticeFormScreen";

const Stack = createStackNavigator();

const AdminNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={routes.ADMIN_DASHBOARD}
      component={AdminDashboardScreen}
    />
    <Stack.Screen
      name={routes.GROUPS_VALIDATION}
      component={GroupsValidationScreen}
    />
    <Stack.Screen name={routes.NOTICE_FORM} component={NoticeFormScreen} />
  </Stack.Navigator>
);

export default AdminNavigator;
