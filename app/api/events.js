import client from "./client";
import endpoints from "./endpoints";

const getEvents = (groupId) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.EVENTSS);

const addEVENTS = (
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

const updateEVENT = (
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

const getEVENT = (groupId, id) =>
  client.get(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS + "/" + id);
const destroyEVENT = (groupId, id) =>
  client.delete(endpoints.GROUPS + "/" + groupId + endpoints.EVENTS + "/" + id);

const getAttendants = (groupId, eventId) =>
  client.get(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.EVENTS +
      "/" +
      eventId +
      endpoints.ATTENDANTS
  );

const addAttendant = (groupId, eventId, attendantId) =>
  client.get(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.EVENTS +
      "/" +
      eventId +
      endpoints.ATTENDANTS +
      "/" +
      attendantId
  );

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

const destroyAttendant = (groupId, eventId, attendantId) =>
  client.get(
    endpoints.GROUPS +
      "/" +
      groupId +
      endpoints.EVENTS +
      "/" +
      eventId +
      endpoints.ATTENDANTS +
      "/" +
      attendantId
  );

export default {
  getEVENTs,
  addEVENT,
  updateEVENT,
  destroyEVENT,
  getAttendants,
  addAttendant,
  updateAttendant,
  destroyAttendant,
};
