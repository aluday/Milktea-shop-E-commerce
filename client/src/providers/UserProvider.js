import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUserData = () => {
    const currentUserInfo = localStorage.getItem('current_user');
    return currentUserInfo && JSON.parse(currentUserInfo);
  }

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        currentUser,
        setCurrentUser,
        getCurrentUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
