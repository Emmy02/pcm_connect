import client from "./client";
import endpoints from "./endpoints";

const getRequests = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.REQUESTS);

const addRequest = (groupId, { user_id, group_id, message, status = 0 }) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.REQUESTS, {
    group_id,
    user_id,
    message,
    status,
  });

const destroyRequest = (groupId, requestId) =>
  client.delete(
    endpoints.GROUPS + "/" + groupId + endpoints.REQUESTS + "/" + requestId
  );
export default {
  getRequests,
  addRequest,
  destroyRequest,
};
