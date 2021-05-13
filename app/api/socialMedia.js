import client from "./client";
import endpoints from "./endpoints";

const setSocialMedia = (groupId, { facebook, twitter, instagram, tiktok }) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.SOCIALMEDIA, {
    facebook,
    twitter,
    instagram,
    tiktok,
  });

export default {
  setSocialMedia,
};
