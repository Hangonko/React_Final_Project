import React from "react";
import Header from "./header/Header";

const index = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default index;
