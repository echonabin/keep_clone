import React from "react";
import Navbar from "../../Navbar/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-10">{children}</div>
    </>
  );
};

export default RootLayout;
