import client from "./client";
import endpoints from "./endpoints";

const getEvents = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS);

const getPublicEvents = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.PUBLIC_EVENTS);

const addEvent = (
  groupId,
  {
    title,
    description,
    expiration_date,
    image,
    subtitle,
    place,
    audience,
    created_by,
  }
) =>
  client.post(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS, {
    title,
    description,
    expiration_date,
    image,
    subtitle,
    place,
    audience,
    created_by,
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
  image_src,
  audience
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
      audience,
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
  getPublicEvents,
  getEvent,
  addEvent,
  updateEvent,
  destroyEvent,
  addAttendant,
  updateAttendant,
  destroyAttendant,
};
