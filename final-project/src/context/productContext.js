import { createContext, useContext, useState } from "react";
import { instance } from "../app/instance";
import useAxios from "../app/useAxios";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const { isLoading, data: mainProductData, error } = useAxios("/products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductUpdating, setIsProductUpdating] = useState(false);
  console.log("Main Products", mainProductData);
  const saveProduct = async (product) => {
    const path = isProductUpdating
      ? `/products/${selectedProduct._id}`
      : "/products";
    let method = isProductUpdating ? "put" : "post";
    try {
      //   setIsLoading(true);
      const resp = await instance[method](path, { ...product });
    } catch (error) {
      //   setError(error.message);
    } finally {
      //   setIsLoading(false);
      setSelectedProduct(null);
      //   setIsProductUpdating(false);
    }
  };
  return (
    <ProductContext.Provider value={{ mainProductData, saveProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
