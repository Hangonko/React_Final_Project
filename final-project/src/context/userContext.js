import { createContext, useContext, useState } from "react";
import { instance } from "../app/instance";
const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(null);

  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await instance.post("/users/register", userData);
      console.log("Data", data);
    } catch (error) {}
  };

  return (
    <userContext.Provider value={{ register }}>{children}</userContext.Provider>
  );
};
