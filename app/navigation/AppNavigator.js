import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./../navigation/routes";

import DashboardScreen from "./../screens/DashboardScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import GroupDetailScreen from "../screens/group/GroupDetailScreen";
import CreateGroupScreen from "./../screens/group/CreateGroupScreen";
import UserProfileScreen from "../screens/group/UserProfileScreen";
import CreateGroupEventScreen from "../screens/group/CreateGroupEventScreen";
import CreateJoinRequest from "../screens/group/JoinRequestMessageScreen";

import AdminDashboardScreen from "./../screens/admin/AdminDashboardScreen";
import GroupsValidationScreen from "./../screens/admin/GroupsValidationScreen";
import NoticeFormScreen from "./../screens/admin/NoticeFormScreen";

import NoticesScreen from "./../screens/notices/NoticesScreen";
import NoticeDetailScreen from "./../screens/notices/NoticeDetailScreen";

import ContactScreen from "./../screens/support/ContactScreen";
import PrivacyAndTermsOfUseScreen from "../screens/support/PrivacyAndTermsOfUseScreen";
import SupportFormScreen from "./../screens/support/SupportFormScreen";
import SupportTicketsScreen from "./../screens/support/SupportTicketsScreen";

import LibraryScreen from "./../screens/library/LibraryScreen";
import ArticleViewScreen from "./../screens/library/ArticleViewScreen";

import useNotifications from "./../hooks/useNotifications";

const Stack = createStackNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={routes.GROUP_DETAILS} component={GroupDetailScreen} />
      <Stack.Screen
        name={routes.CREATE_JOIN_REQUEST}
        component={CreateJoinRequest}
      />
      <Stack.Screen name={routes.CREATE_GROUP} component={CreateGroupScreen} />
      <Stack.Screen
        name={routes.CREATE_GROUP_EVENT}
        component={CreateGroupEventScreen}
      />
      <Stack.Screen
        name={routes.USER_PROFILE_GROUP}
        component={UserProfileScreen}
      />
      <Stack.Screen
        name={routes.ADMIN_DASHBOARD}
        component={AdminDashboardScreen}
      />
      <Stack.Screen
        name={routes.GROUPS_VALIDATION}
        component={GroupsValidationScreen}
      />
      <Stack.Screen name={routes.NOTICE_FORM} component={NoticeFormScreen} />
      <Stack.Screen name={routes.NOTICES} component={NoticesScreen} />
      <Stack.Screen
        name={routes.NOTICE_DETAILS}
        component={NoticeDetailScreen}
      />
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
      <Stack.Screen name={routes.LIBRARY} component={LibraryScreen} />
      <Stack.Screen name={routes.ARTICLE_VIEW} component={ArticleViewScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
