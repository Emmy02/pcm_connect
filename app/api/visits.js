import client from "./client";
import endpoints from "./endpoints";

const addVisit = ({ user_id, entity_id, entity_type }) =>
  client.post(endpoints.VISITS, { user_id, entity_id, entity_type });

export default {
  addVisit,
};
