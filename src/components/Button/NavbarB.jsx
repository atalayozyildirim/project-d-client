import React from "react";
import { Link } from "react-router-dom";

const NavbarButton = ({ comp, href }) => {
  return (
    <>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#171717",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link
          to={href}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {comp}
        </Link>
      </div>
    </>
  );
};
export default NavbarButton;
