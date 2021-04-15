import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (data) => {
    setUser(data["auth_token"]);
    authStorage.storeToken(data["auth_token"]);
  };

  const saveCrendentials = ({ email, password }) => {
    authStorage.storeCredentials({ email, password });
  };

  const getCrendentials = async () => {
    return authStorage.getCredentials();
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
    authStorage.removeCredentials();
  };

  return { user, logIn, logOut, saveCrendentials, getCrendentials };
};
