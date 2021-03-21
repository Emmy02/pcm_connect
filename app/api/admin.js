import client from "./client";
import endpoints from "./endpoints";

const getDirectorGroups = () => client.get(endpoints.DIRECTOR_GROUPS);
const getDirectorDashboard = () => client.get(endpoints.DIRECTOR_DASHBOARD);

export default {
  getDirectorGroups,
  getDirectorDashboard,
};
