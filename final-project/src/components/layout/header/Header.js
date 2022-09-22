import React from "react";
import { useUserContext } from "../../../context/userContext";

const Header = () => {
  const { userData } = useUserContext();
  return <div>Hello {userData && userData?.firstName}</div>;
};

export default Header;
