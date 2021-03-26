import { useContext } from "react";

import AccountContext from "./context";

export default useAccount = () => {
  const { profile, setProfile } = useContext(AccountContext);

  const getRoles = (roles = []) => {
    let userRoles = {
      isMember: false,
      isOwner: false,
      isAdmin: false,
      isDirector: false,
      isDefaultUser: false,
      isRequested: false,
      isCoordinator: false,
      isNewGroup: false,
    };

    let resources = {
      requestedGroupId: null,
      ownerGroupId: null,
      memberGroupId: null,
    };

    roles.map((r) => {
      if (r.name === "admin") {
        userRoles.isAdmin = true;
      }

      if (r.name === "newuser") {
        userRoles.isMember = false;
        userRoles.isOwner = false;
        userRoles.isRequested = false;
        resources.groupId = 0;
        userRoles.isDefaultUser = true;
      }

      if (r.name === "interested") {
        userRoles.isRequested = true;
        resources.requestedGroupId = r.resource_id;
      }

      if (r.name === "coordinator") {
        userRoles.isCoordinator = true;
      }

      if (r.name === "owner") {
        userRoles.isOwner = true;
        userRoles.isRequested = false;
        userRoles.isDefaultUser = false;
        resources.ownerGroupId = r.resource_id;
      }

      if (r.name === "member") {
        userRoles.isMember = true;
        userRoles.isRequested = false;
        userRoles.isDefaultUser = false;
        resources.memberGroupId = r.resource_id;
      }

      if (r.name === "director") {
        userRoles.isDirector = true;
      }
    });

    return { roles: userRoles, resources };
  };

  return { profile, setProfile, getRoles };
};
