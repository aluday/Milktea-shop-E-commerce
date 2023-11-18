import React from "react";
import Header from "./Header";
export const Default = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Default;
