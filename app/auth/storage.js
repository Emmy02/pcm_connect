import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeCredentials = async ({ email, password }) => {
  try {
    await SecureStore.setItemAsync(
      "credentials",
      JSON.stringify({ email, password })
    );
  } catch (error) {
    console.log("Error storing the auth Credentials", error);
  }
};

const getCredentials = async () => {
  try {
    return await SecureStore.getItemAsync("credentials");
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const removeCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync("credentials");
  } catch (error) {
    console.log("Error removing the auth credentials", error);
  }
};

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
  storeCredentials,
  getCredentials,
  removeCredentials,
};
