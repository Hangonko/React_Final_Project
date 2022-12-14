import React from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../app/useAxios";

const SingleProductComponent = () => {
  const location = useLocation();
  const { id, category } = location.state;
  const { data } = useAxios(`/products/category/${category}/${id}`);
  console.log("Location", location);
  return (
    <div style={{ marginTop: "350px" }}>
      <h1>{data.product?.name}</h1>
      <h2>{data.product?.description}</h2>
    </div>
  );
};

export default SingleProductComponent;
