import { Grid, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../../app/useAxios";
import PaginationComponent from "../shared/Pagination";
import ProductCard from "./ProductCard";

const CategoryProductList = () => {
  const { categoryName } = useParams();
  const [page, setPage] = useSearchParams();
  const [sort, setSort] = useState("price, desc");
  const { data } = useAxios(
    `/products/category/${categoryName}?page=${page.get(
      "page"
    )}&sort=${sort}&size=3`
  );
  console.log("data", data);
  return (
    <div>
      <Select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        style={{ width: "150px", height: "50px", marginTop: "25px" }}
      >
        <MenuItem value={"price,desc"}>ფასი კლებადობით</MenuItem>
        <MenuItem value={"price,asc"}>ფასი ზრდადობით</MenuItem>
        <MenuItem value={"name,asc"}>A-Z</MenuItem>
        <MenuItem value={"name,desc"}>Z-A</MenuItem>
      </Select>
      <Grid container spacing={2}>
        {data.products?.length > 0 &&
          data.products.map((product) => {
            return (
              <Grid key={product._id} item xs={4} style={{ marginTop: "50px" }}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
      </Grid>
      <PaginationComponent
        page={page || 1}
        setPage={setPage}
        totalPages={data.totalPages}
      />
    </div>
  );
};

export default CategoryProductList;

const Wrapper = ({ isLoading, isError, children }) => {
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return children;
};
