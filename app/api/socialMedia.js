import client from "./client";
import endpoints from "./endpoints";

const addSocialMedia = (groupId, { facebook, twitter, instagram, tiktok }) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.SOCIALMEDIA, {
    facebook,
    twitter,
    instagram,
    tiktok,
  });

const updateSocialMedia = (
  groupId,
  smpId,
  { facebook, twitter, instagram, tiktok }
) =>
  client.post(
    endpoints.GROUPS + "/" + groupId + endpoints.SOCIALMEDIA + "/" + smpId,
    {
      facebook,
      twitter,
      instagram,
      tiktok,
    }
  );

export default {
  addSocialMedia,
  updateSocialMedia,
};
