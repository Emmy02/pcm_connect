import client from "./client";
import endpoints from "./endpoints";

const addGroupSubscription = (groupId) =>
  client.post(endpoints.GROUPS_SUBSCRIPTIONS, { group_id: groupId });

const destroyGroupSubscription = (subscriptionId) =>
  client.delete(endpoints.GROUPS_SUBSCRIPTIONS + "/" + subscriptionId);

export default {
  addGroupSubscription,
  destroyGroupSubscription,
};
