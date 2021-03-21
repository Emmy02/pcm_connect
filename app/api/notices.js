import client from "./client";
import endpoints from "./endpoints";

const getNotices = () => client.get(endpoints.NOTICES);

const addNotice = (
  title,
  description,
  expiration_date,
  image,
  subtitle,
  place,
  image_src
) =>
  client.post(endpoints.NOTICES, {
    title,
    description,
    expiration_date,
    image,
    subtitle,
    place,
    image_src,
  });

const updateNotice = (
  id,
  title,
  description,
  expiration_date,
  image,
  subtitle,
  place,
  image_src
) =>
  client.update(endpoints.NOTICES + "/" + id, {
    title,
    description,
    expiration_date,
    image,
    subtitle,
    place,
    image_src,
  });

const getNotice = (id) => client.get(endpoints.NOTICES + "/" + id);
const destroyNotice = (id) => client.delete(endpoints.NOTICES + "/" + id);

const getAttendants = (noticeId) =>
  client.get(endpoints.NOTICES + "/" + noticeId + endpoints.ATTENDANTS);
const addAttendant = (noticeId) =>
  client.get(endpoints.NOTICES + "/" + noticeId);
const updateAttendant = (noticeId) =>
  client.get(endpoints.NOTICES + "/" + noticeId);

const destroyAttendant = (noticeId) =>
  client.get(endpoints.NOTICES + "/" + noticeId);

export default {
  getNotices,
  addNotice,
  updateNotice,
  destroyNotice,
  getAttendants,
  addAttendant,
  updateAttendant,
  destroyAttendant,
};
