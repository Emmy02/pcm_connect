import client from "./client";
import endpoints from "./endpoints";

const getMessages = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.MESSAGES);

const addMessage = (
  groupId,
  { user_id, group_id, content, status = 0, flagged = false }
) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.MESSAGES, {
    group_id,
    user_id,
    content,
    status,
    flagged,
  });

const updateMessage = (
  groupId,
  messageId,
  { user_id, group_id, content, status = 0, flagged = false }
) =>
  client.update(
    endpoints.GROUPS + "/" + groupId + endpoints.MESSAGES + "/" + messageId, { user_id, group_id, content, status = 0, flagged = false }
  );

const destroyMessage = (groupId, messageId) => client.delete(endpoints.GROUPS + '/' + groupId + endpoints.MESSAGES + '/' + messageId);

export default {
  getMessages,
  addMessage,
  updateMessage,
  destroyMessage,
};
