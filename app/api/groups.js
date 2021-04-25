import client from "./client";
import endpoints from "./endpoints";

const getGroups = () => client.get(endpoints.GROUPS);
const getMostPopularGroups = () => client.get(endpoints.MOST_POPULAR_GROUPS);

const getPendingGroups = () => client.get(endpoints.INACTIVE_GROUPS);
const getGroupsByLocation = (lat, lng) =>
  client.post(endpoints.GROUPS_BY_LOCATION, { lat, lng, distance: 20 });
const getGroupsByUniversity = () => client.get(endpoints.GROUPS_BY_UNIVERSITY);
const getGroupsByName = (name) =>
  client.post(endpoints.GROUPS_BY_NAME, { name });

const getGroup = (id) => client.get(endpoints.GROUPS + "/" + id);
const destroyGroup = (id) => client.delete(endpoints.GROUPS + "/" + id);

const updateGroup = (id, { name, description, address, lat, lng }) =>
  client.put(endpoints.GROUPS + "/" + id, {
    name,
    description,
    address,
    lat,
    lng,
  });

const acceptGroup = (id, { status = 1, adventist_association_id }) =>
  client.put(endpoints.GROUPS + "/" + id, { status, adventist_association_id });

const rejectGroup = (id, { status = 2 }) =>
  client.put(endpoints.GROUPS + "/" + id, {
    status,
  });

const uploadImage = (id, form, onUploadProgress) => {
  return client.post(
    endpoints.GROUPS + "/" + id + endpoints.UPLOAD_GROUP_IMAGE,
    form,
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

const addGroup = ({
  name,
  description,
  address,
  lat,
  lng,
  university_id,
  country_id,
  created_by,
  status = 0,
}) =>
  client.post(endpoints.GROUPS, {
    name,
    description,
    address,
    lat,
    lng,
    university_id,
    country_id,
    created_by,
    status,
  });

export default {
  getGroups,
  getMostPopularGroups,
  getPendingGroups,
  getGroupsByLocation,
  getGroupsByUniversity,
  getGroupsByName,
  getGroup,
  destroyGroup,
  updateGroup,
  addGroup,
  acceptGroup,
  rejectGroup,
  uploadImage,
};
