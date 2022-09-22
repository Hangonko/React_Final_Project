import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../app/instance";
const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await instance.post("/users/register", userData);
      console.log("Data");
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      navigate(`/profile/${data.user.firstName}`, {
        state: { id: data.used._id },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userInfo) => {
    try {
      setLoading(true);
      const { data } = await instance.post("/users/login", userInfo);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      navigate(`/profile/${data.user.firstName}`, {
        state: { id: data.used._id },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <userContext.Provider value={{ register, userData, login }}>
      {children}
    </userContext.Provider>
  );
};
