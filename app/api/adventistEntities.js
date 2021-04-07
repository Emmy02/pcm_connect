import client from "./client";
import endpoints from "./endpoints";

const getAdventistDivisions = () => client.get(endpoints.ADVENTIST_DIVISIONS);
const getAdventistUnions = (adventistDivisionId) =>
  client.get(
    endpoints.ADVENTIST_DIVISIONS +
      "/" +
      adventistDivisionId +
      endpoints.ADVENTIST_UNIONS
  );
const getAdventistAssociations = (adventistDivisionId, adventistUnionId) =>
  client.get(
    endpoints.ADVENTIST_DIVISIONS +
      "/" +
      adventistDivisionId +
      endpoints.ADVENTIST_UNIONS +
      "/" +
      adventistUnionId +
      endpoints.ADVENTIST_ASSOCIATIONS
  );

export default {
  getAdventistDivisions,
  getAdventistUnions,
  getAdventistAssociations,
};
