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
    <div className="header">
      <Search />
      <nav className="Nav">
        <Link to="/" className="NavItem">
          Home
        </Link>
        <Link to="/cart" className="NavItem">
          Cart
        </Link>
        {!userData ? (
          <>
            <Link to="./login" className="NavItem">
              Log in
            </Link>
            <Link to="/register" className="NavItem">
              Register
            </Link>
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
