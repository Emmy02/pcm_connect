import client from "./client";
const setPushNotificationToken = ({ value, provider }) =>
  client.post("/tokens", { value, provider });

export default {
  setPushNotificationToken,
};
