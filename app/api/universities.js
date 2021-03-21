import client from "./client";
import endpoints from "./endpoints";

const remoteUrl =
  "https://pcm-universities-api.herokuapp.com/find_by_name_or_country";

const getUniversities = () => client.get(endpoints.UNIVERSITIES);
const setUniversity = (name, country_name, country_id) =>
  client.post(endpoints.UNIVERSITIES, { name, country_name, country_id });

const updateUniversity = (id, name, country_name, country_id) =>
  client.updateUniversity(endpoints.UNIVERSITIES + "/" + id, {
    name,
    country_id,
    country_name,
  });

const destroyUniversity = (id) =>
  client.delete(endpoints.UNIVERSITIES + "/" + id);

const getRemoteUniversities = (name, country) =>
  client.post(remoteUrl, { name, country });

export default {
  getUniversities,
  setUniversity,
  updateUniversity,
  destroyUniversity,
  getRemoteUniversities,
};
