import React from "react";
import { useUserContext } from "../../context/userContext";
import { FormControl, TextField } from "@mui/material";
import useAxios from "../../app/useAxios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { data } = useAxios(`/users/${location.state?.id}`);
  console.log("data", data);
  return (
    <div>
      {/* Hello {userData && userData?.firstName} */}
      <FormControl fullWidth>
        <TextField value={data?.user?.firstName || ""} disabled={true} />
        <TextField value={data?.user?.lastName || ""} />
        <TextField value={data?.user?.email || ""} disabled={true} />
      </FormControl>
    </div>
  );
};

export default Profile;
