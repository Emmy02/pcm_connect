import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://pcm-api.herokuapp.com",
  },
  staging: {
    apiUrl: "http://192.168.0.14:9000/api",
  },
  prod: {
    apiUrl: "https://pcm-api.herokuapp.com",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
