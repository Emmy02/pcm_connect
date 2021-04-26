import * as Notifications from "expo-notifications";

const addReminder = async ({ title, body, expiration_date }) => {
  const trigger = new Date(expiration_date);

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
};

export { addReminder };
