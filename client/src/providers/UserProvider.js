import React, { useState } from "react";
import * as messages from "../services/messages";
import {
  signin,
  getCurrentUser,
  handleError,
} from "../services/endpoint-services";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleSignin = () => {
    signin({ username, password })
      .then((res) => {
        if (res && res.status === 200 && res.data && res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          // call authorize to verify the token again to get the current user who logged in
          getCurrentUser(res.data.access_token)
            .then((res) => {
              if (res && res.data && res.data.currentUser) {
                setCurrentUser(res.data.currentUser);
                localStorage.setItem('current_user', JSON.stringify(res.data.currentUser));
              }
            })
            .catch((err) => {
              handleError(err);
              messages.error();
            });
        }
      })
      .catch((err) => {
        handleError(err);
        messages.error();
      });
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        handleSignin,
        currentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
