import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import DashboardScreen from "./../screens/DashboardScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import GroupDetailScreen from "../screens/group/GroupDetailScreen";
import UserProfileScreen from "../screens/group/UserProfileScreen";

import NoticesNavigator from "./../navigation/NoticesNavigator";
import SupportNavigator from "./../navigation/SupportNavigator";
import AdminNavigator from "./../navigation/AdminNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.DASHBOARD} component={DashboardScreen} />
    <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={routes.NOTICES} component={NoticesNavigator} />
    <Stack.Screen name={routes.CONTACT} component={SupportNavigator} />
    <Stack.Screen name={routes.ADMIN_DASHBOARD} component={AdminNavigator} />
    <Stack.Screen name={routes.GROUP_DETAILS} component={GroupDetailScreen} />
    <Stack.Screen
      name={routes.USER_PROFILE_GROUP}
      component={UserProfileScreen}
    />
  </Stack.Navigator>
);

export default AppNavigator;
