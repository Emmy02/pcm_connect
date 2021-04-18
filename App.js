import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import AccountContext from "./app/account/context";

import { navigationRef } from "./app/navigation/rootNavigation";

import { init } from "./app/config/IMLocalized";

export default function App() {
  init();
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={() => {}}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef}>
        {user ? (
          <AccountContext.Provider value={{ profile, setProfile }}>
            <AppNavigator />
          </AccountContext.Provider>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
