import client from "./client";
import endpoints from "./endpoints";

const addLike = ({ user_id, read_id, read_type }) =>
  client.post(endpoints.LIKES, { user_id, read_id, read_type });

const removeLike = ({ id }) => client.delete(endpoints.LIKES + "/" + id);

export default {
  addLike,
  removeLike,
};
