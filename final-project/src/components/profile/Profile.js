import React from "react";
import { useUserContext } from "../../context/userContext";

const Profile = () => {
  const { userData } = useUserContext();
  return <div>Profile {userData.firstName}</div>;
};

export default Profile;
