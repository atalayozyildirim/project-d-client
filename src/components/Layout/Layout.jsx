import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarTopButton from "../Navbar/TopNavbar.jsx";
import { connectWebSocket } from "../../util/websocket/Socket.js";
import "../../App.css";
import { ToastContainer } from "react-toastify";
import Search from "../Form/Search.jsx";
import { useSearchNavbar } from "../../Context/Search.jsx";

const Layout = ({ children }) => {
  const { showAddSearch, showAddSearchI } = useSearchNavbar();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    const socket = connectWebSocket(token);

    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <NavbarTopButton />
      {showAddSearch && <Search close={showAddSearchI} />}
      <div className="flex flex-row gap-0">
        <ToastContainer />
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
