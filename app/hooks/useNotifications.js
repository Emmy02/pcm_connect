import { useEffect } from "react";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "./../api/expoPushToken";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();

      expoPushTokensApi.setPushNotificationToken({
        value: token.data,
        provider: 3,
      });
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
