import client from "./client";
import endpoints from "./endpoints";

const customTicketUrl = "/my_tickets";

const getMyTickets = () => client.get(customTicketUrl);

const addTicket = ({ title, description }) =>
  client.post(endpoints.TICKETS, { title, description });

const updateTicket = (id, name, description) =>
  client.update(customTicketUrl + "/" + id, { name, description });

export default {
  getMyTickets,
  addTicket,
  updateTicket,
};
