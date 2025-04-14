import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarTopButton from "../Navbar/TopNavbar.jsx";
import "../../App.css";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarTopButton />
      <div className="flex flex-row gap-0">
        <Navbar />
        <div className="w-11/12 pt-12 relative left-28 h-screen">
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
