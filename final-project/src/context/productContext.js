import { createContext, useContext } from "react";
import useAxios from "../app/useAxios";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const { isLoading, data: mainProductData, error } = useAxios("/products");
  console.log("Main Products", mainProductData);
  return (
    <ProductContext.Provider value={{ mainProductData }}>
      {children}
    </ProductContext.Provider>
  );
};
