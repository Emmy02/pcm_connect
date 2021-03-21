import client from "./client";
import endpoints from "./endpoints";

const getMembers = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.MEMBERS);

const addMember = (groupId, { user_id, group_id }) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.MEMBERS, {
    group_id,
    user_id,
  });

const destroyMember = (groupId, memberId) =>
  client.delete(
    endpoints.GROUPS + "/" + groupId + endpoints.MEMBERS + "/" + memberId
  );

const setMemberRole = (groupId, memberId) =>
  client.post(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.MEMBERS +
      "/" +
      memberId +
      "/make_member",
    {}
  );

const setOwnerRole = (groupId, memberId) =>
  client.post(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.MEMBERS +
      "/" +
      memberId +
      "/make_owner",
    {}
  );
export default {
  getMembers,
  addMember,
  destroyMember,
  setMemberRole,
  setOwnerRole,
};
