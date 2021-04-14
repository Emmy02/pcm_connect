import client from "./client";
import endpoints from "./endpoints";

const getNotices = () => client.get(endpoints.NOTICES);
const getAdventistUnionNotices = () =>
  client.get(endpoints.ADVENTIST_UNION_NOTICES);
const getAdventistAssociationNotices = () =>
  client.get(endpoints.ADVENTIST_ASSOCIATION_NOTICES);

const addNotice = ({
  title,
  description,
  expiration_date,
  subtitle,
  place,
  image_src,
  created_by,
}) =>
  client.post(endpoints.NOTICES, {
    title,
    description,
    expiration_date,
    subtitle,
    place,
    image_src,
    created_by,
  });

const updateNotice = (
  id,
  title,
  description,
  expiration_date,
  subtitle,
  place,
  image_src
) =>
  client.update(endpoints.NOTICES + "/" + id, {
    title,
    description,
    expiration_date,
    subtitle,
    place,
    image_src,
  });

const getNotice = (id) => client.get(endpoints.NOTICES + "/" + id);
const destroyNotice = (id) => client.delete(endpoints.NOTICES + "/" + id);

const addAttendant = (attendant) =>
  client.post(endpoints.ATTENDANTS, attendant);

const destroyAttendant = (attendantId) =>
  client.delete(endpoints.ATTENDANTS + "/" + attendantId);

export default {
  getNotices,
  getAdventistUnionNotices,
  getAdventistAssociationNotices,
  addNotice,
  updateNotice,
  destroyNotice,
  addAttendant,
  destroyAttendant,
  getNotice,
};
