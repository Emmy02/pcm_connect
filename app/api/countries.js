import client from "./client";
import endpoints from "./endpoints";

const getCountries = () => client.get(endpoints.COUNTRIES);

const setCountry = (name, code, activated = true) =>
  client.post(endpoints.COUNTRIES, { name, code, activated });

const updateCountry = (id, name, code, activated = true) =>
  client.update(endpoints.COUNTRIES + "/" + 1, { name, code, activated });

const destroyCountry = (id) => client.delete(endpoints.COUNTRIES + "/" + id);

const getCountry = (id) => client.get(endpoints.COUNTRIES + "/" + id);

export default {
  getCountries,
  setCountry,
  updateCountry,
  destroyCountry,
  getCountry,
};
