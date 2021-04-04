import client from "./client";
import endpoints from "./endpoints";

const getProfile = () => client.get(endpoints.PROFILE);
const updateProfile = ({
  first_name,
  last_name,
  age,
  gender,
  is_adventist,
  career_name,
  career_category,
  cover,
}) =>
  client.put(endpoints.PROFILE, {
    first_name,
    last_name,
    age,
    gender,
    is_adventist,
    career_name,
    career_category,
    cover,
  });

const uploadAvatar = (form, onUploadProgress) => {
  return client.post(endpoints.UPLOAD_AVATAR, form, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const cancelRequest = ({ status = 2 }) =>
  client.post(endpoints.CANCEL_REQUEST, { status });

const addReport = ({ created_by, user_id, status, description }) =>
  client.post(endpoints.REPORTS, { created_by, user_id, status, description });

export default {
  getProfile,
  updateProfile,
  uploadAvatar,
  cancelRequest,
  addReport,
};
