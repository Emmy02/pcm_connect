import client from "./client";
import endpoints from "./endpoints";

const getPosts = () => client.get(endpoints.POSTS);

const getPost = ({ id }) => client.get(endpoints.POSTS + "/" + id);

const addPosts = ({ title, body }) =>
  client.post(endpoints.TICKETS, { title, body });

const updatePosts = ({ id, title, body }) =>
  client.update(endpoints.POSTS + "/" + id, { title, body });

export default {
  getPost,
  getPosts,
  addPosts,
  updatePosts,
};
