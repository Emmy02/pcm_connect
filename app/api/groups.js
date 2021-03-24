import client from "./client";
import endpoints from "./endpoints";

const getGroups = () => client.get(endpoints.GROUPS);
const getPendingGroups = () => client.get(endpoints.INACTIVE_GROUPS);
const getGroupsByLocation = (lat, lng) =>
  client.post(endpoints.GROUPS_BY_LOCATION, { lat, lng, distance: 20 });
const getGroupsByUniversity = () => client.get(endpoints.GROUPS_BY_UNIVERSITY);
const getGroupsByName = () => client.get(endpoints.GROUPS_BY_NAME);

const getGroup = (id) => client.get(endpoints.GROUPS + "/" + id);
const destroyGroup = (id) => client.delete(endpoints.GROUPS + "/" + id);

const updateGroup = (id, { name, description, address, location, images }) => {
  const data = new FormData();
  data.append("name", group.title);
  data.append("description", group.description);
  data.append("address", group.address);

  images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const addGroup = (group, onUploadProgress) => {
  const data = new FormData();
  data.append("name", group.title);
  data.append("description", group.description);
  data.append("address", group.address);
  data.append("status", group.status);
  data.append("university_id", group.stuniversity_idatus);
  data.append("adventist_association_id", group.adventist_association_id);
  data.append("status", group.status);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getGroups,
  getPendingGroups,
  getGroupsByLocation,
  getGroupsByUniversity,
  getGroupsByName,
  getGroup,
  destroyGroup,
  updateGroup,
};
