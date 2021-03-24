import { useContext } from "react";

import AccountContext from "./context";

export default useAccount = () => {
  const { profile, setProfile } = useContext(AccountContext);

  return { profile, setProfile };
};
