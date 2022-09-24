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
          HOME
        </Link>
        <Link to="/cart" className="NavItem">
          CART
        </Link>
        {!userData ? (
          <>
            <Link to="./login" className="NavItem">
              LOG IN
            </Link>
            <Link to="/register" className="NavItem">
              REGISTER
            </Link>
          </>
        ) : (
          <>
            <Button
              onClick={navigateToProfile}
              style={{
                marginRight: "10px",
                textDecoration: "none",
                color: "black",
                fontSize: "15px",
                marginTop: "2px",
                borderRadius: "0px",
              }}
              className="NavItem"
            >
              Profile
            </Button>
            <Button
              onClick={logout}
              style={{
                marginRight: "10px",
                textDecoration: "none",
                color: "white",
                fontSize: "15px",
                marginTop: "2px",
                borderRadius: "0px",
                backgroundColor: "#7926f0",
                borderRadius: "10px",
                padding: "5px 15px",
              }}
              className="LogoutHover"
            >
              Log Out
            </Button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
