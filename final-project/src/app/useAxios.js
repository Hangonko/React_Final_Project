import React, { useEffect, useState } from "react";
import { instance } from "./instance";

const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      console.log("shemovida line 9");
      const { data } = await instance.get(url);
      setData(data);
      console.log("Data");
    };
    getData();
  }, [url]);
  return {
    data,
  };
};

export default useAxios;
