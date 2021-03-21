import client from "./client";

const login = (email, password) =>
  client.post("/auth/login", JSON.stringify({ email, password }));

const signup = (email, password, language) =>
  client.post("/signup", JSON.stringify({ email, password, language }));

const emailExits = (email) =>
  client.post("/user_exists", JSON.stringify({ email }));

const sendInstructions = (email) =>
  client.post("/send_instructions", JSON.stringify({ email }));

const updatePassword = () => client.post("/update_password", JSON.stringify());

export default {
  login,
  signup,
  emailExits,
  sendInstructions,
  updatePassword,
};
