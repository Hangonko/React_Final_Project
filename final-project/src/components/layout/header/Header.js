import React from "react";
import { useUserContext } from "../../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Search from "./Search";

const Header = () => {
  const { userData, logout } = useUserContext();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile/${userData.firstName}`, {
      state: { id: userData._id },
    });
  };
  return (
    <div>
      Hello
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/cart">Cart</Link>
        <br />
        <Search />
        {!userData ? (
          <>
            <Link to="./login">Log in</Link>
            <br />
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Button onClick={navigateToProfile}>Profile</Button>
            <Button onClick={logout}>Log Out</Button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
