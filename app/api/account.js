import client from "./client";
import endpoints from "./endpoints";

const getProfile = () => client.get(endpoints.PROFILE);
const uploadAvatar = (form) => client.post(endpoints.UPLOAD_AVATAR, form);

const cancelRequest = ({ status = 2 }) =>
  client.post(endpoints.CANCEL_REQUEST, { status });

const addReport = ({ created_by, user_id, status, description }) =>
  client.post(endpoints.REPORTS, { created_by, user_id, status, description });

export default {
  getProfile,
  uploadAvatar,
  cancelRequest,
  addReport,
};
