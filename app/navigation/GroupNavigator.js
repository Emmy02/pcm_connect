import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import GroupDetailScreen from "./../screens/group/GroupDetailScreen";
import UserProfileScreen from "./../screens/group/UserProfileScreen";

const Stack = createStackNavigator();

const GroupNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.GROUP_DETAILS} component={GroupDetailScreen} />
    <Stack.Screen
      name={routes.USER_PROFILE_GROUP}
      component={UserProfileScreen}
    />
  </Stack.Navigator>
);

export default GroupNavigator;
