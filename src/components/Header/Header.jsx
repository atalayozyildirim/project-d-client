import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <div className="">Logo</div>
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      </header>
    </>
  );
};
export default Header;
