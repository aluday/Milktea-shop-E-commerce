import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Header from '../../shared-components/Header';

export const Profile = () => {
  const { currentUser, handleOnClickCatalog } = useContext(UserContext);

  return (
    <div>
      <Header currentUser={currentUser} handleOnClickCatalog={handleOnClickCatalog} />
      <div className="userProfileContainer">
        <div className="userInfo"></div>
      </div>
    </div>
  );
};

export default Profile;
