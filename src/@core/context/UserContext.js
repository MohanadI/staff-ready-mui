import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

export const UserContext = React.createContext([]);

/**
 * Provides access to the UserContext within the application.
 *
 * @param {*} props
 * @returns
 */
function UserContextProvider(props) {
  const [permissions, setPermissions] = useState([]);
  const [isLicenseAdmin, setIsLicenseAdmin] = useState(false);
  const [user, setUser] = useState(undefined);

  const [context, setContext] = useState(null);

  // get the Person for the logged in user, or set admin details
  const getUserData = useCallback(async () => {
    let userData;
    await axios
      .get(`/StaffReady/v10/api/account/user`)
      .then((res) => {
        userData = res.data;
        setUser(userData);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          // this should only occur if the user is an admin
          axios.get(`/StaffReady/v10/api/account/userId`).then((res) => {
            userData = { name: res.data };
            setUser(userData);
          });
          axios.get(`/StaffReady/v10/api/user-access/is-admin`).then((res) => {
            setIsLicenseAdmin(res.data);
          });
        }
      });
  }, []);

  // get the User's roles
  const getUserPermissions = useCallback(async () => {
    await axios
      .get(`/StaffReady/v10/api/authorization/permissions`)
      .then((res) => {
        setPermissions(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getContext = useCallback(async () => {
    await getUserData();
    await getUserPermissions();
  }, []);

  useEffect(() => {
    getContext();
  }, []);

  useEffect(() => {
    setContext({
      user: user,
      isLicenseAdmin: isLicenseAdmin,
      userPermissions: [...permissions],
    });
  }, [user, isLicenseAdmin, permissions]);

  return (
    <UserContext.Provider value={context}>
      {context?.user && props.children}
    </UserContext.Provider>
  );
}

/**
 * Determines whether to render children based on props.roles.
 * If a value from the User's roles (provided by UserContext) match a value from props.permissions then this components children are rendered.
 *
 * @param {string} props.permissions a comma separated list of roles
 */
export const ConditionalView = (props) => {
  const { permissions } = props;

  // Remove all whitespace from roles string and convert CSV string to array
  const permissionsAra = permissions.replace(/\s+/g, "").split(",");

  const { userPermissions } = useContext(UserContext);
  if (!userPermissions || !permissions) return null;

  const userPermissionsSet = new Set();
  userPermissions.forEach((permission) => userPermissionsSet.add(permission));
  const userPermissionsAra = Array.from(userPermissionsSet);

  if (userPermissionsAra.some((permission) => permissionsAra.includes(role)))
    return props.children;

  return null;
};

export function withUserContext(Component) {
  return (props) => {
    const { user, isLicenseAdmin, userPermissions } = useContext(UserContext);

    return (
      <Component
        user={user}
        isLicenseAdmin={isLicenseAdmin}
        userPermissions={userPermissions}
        {...props}
      />
    );
  };
}

export default UserContextProvider;
