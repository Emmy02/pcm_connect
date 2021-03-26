import client from "./client";
import endpoints from "./endpoints";

const getEvents = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS);

const addEvent = (
  groupId,
  title,
  description,
  expiration_date,
  image,
  subtitle,
  place,
  image_src
) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS, {
    title,
    description,
    expiration_date,
    image,
    subtitle,
    place,
    image_src,
  });

const updateEvent = (
  groupId,
  id,
  title,
  description,
  expiration_date,
  image,
  subtitle,
  place,
  image_src
) =>
  client.update(
    endpoints.GROUPS + "/" + groupId + endpoints.EVENTS + "/" + id,
    {
      title,
      description,
      expiration_date,
      image,
      subtitle,
      place,
      image_src,
    }
  );

const getEvent = (groupId, id) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS + "/" + id);
const destroyEvent = (groupId, id) =>
  client.delete(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS + "/" + id);

const addAttendant = ({ status, user_id, activity_type, activity_id }) =>
  client.post(endpoints.ATTENDANTS, {
    status,
    user_id,
    activity_type,
    activity_id,
  });

const updateAttendant = (groupId, eventId, attendantId) =>
  client.get(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.EVENTS +
      "/" +
      eventId +
      endpoints.ATTENDANTS +
      "/" +
      attendantId,
    {}
  );

const destroyAttendant = (attendantId) =>
  client.delete(endpoints.ATTENDANTS + "/" + attendantId);

export default {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  destroyEvent,
  addAttendant,
  updateAttendant,
  destroyAttendant,
};
