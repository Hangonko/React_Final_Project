import { Button, Icon, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../app/instance";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setTimeout(() => {
      const filterByName = async () => {
        const { data } = await instance.get(`/products/search?name=${value}`);
        setSearchResult(data);
      };
      if (value) {
        filterByName();
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [value]);
  const onClick = () => {
    navigate("/searchPage");
  };
  console.log(searchResult);
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="Input"
      />
      <Button onClick={onClick} style={{ color: "#7926ff", fontSize: "bold" }}>
        Search
      </Button>
    </div>
  );
};

export default Search;
