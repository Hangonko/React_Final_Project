import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../context/productContext";

const Navbar = () => {
  const { mainProductData } = useProductContext();
  return (
    <div
      style={{
        paddingTop: "65px",
      }}
    >
      {mainProductData.categories?.length > 0 &&
        mainProductData.categories.map((category) => {
          return (
            <Link
              key={category._id}
              to={`/products/categories/${category.name}?page=1`}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              className="categoryLinks"
            >
              {category.name}
            </Link>
          );
        })}
    </div>
  );
};

export default Navbar;
