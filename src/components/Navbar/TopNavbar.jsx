import React from "react";
import EditNavbar from "../Button/EditNavbar.jsx";
import Download from "../Button/Download.jsx";
import Search from "../Button/Search.jsx";
import AddNavbarButtons from "../Button/AddNavbarButtons.jsx";
import AddInput from "../Button/AddInput.jsx";
import Invoice from "../Form/Invoice.jsx";
import { useADDNavbar } from "../../Context/AddNavbarContext.jsx";
import { Link, useLocation } from "react-router-dom";
import { useImap } from "../../Context/ImapContext.jsx";

const NavbarTopButton = () => {
  const { showAddI } = useADDNavbar();
  const { showAddIm } = useImap();
  const location = useLocation().pathname;
  const [showAdd, setShowAdd] = React.useState(false);
  const [showInvoice, setShowInvoice] = React.useState(false);

  const showAddInput = () => {
    setShowAdd(!showAdd);
  };

  const showInvoiceInput = () => {
    setShowInvoice(!showInvoice);
  };

  return (
    <>
      {showAdd && <AddInput close={showAddInput} />}
      {location === "/invoice" && showInvoice ? (
        <Invoice InvoiceID={"123"} closeInvoice={showInvoiceInput} />
      ) : null}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-1/2 z-10 bg-[#141517] shadow-lg h-14 p-1 mt-2 rounded-3xl flex justify-between items-center">
        <div className="flex items-center gap-20 mx-auto">
          {location == "/customers" ||
          location == "/employers" ||
          location == "/invoice" ||
          location == "/mail" ||
          location == "/tasks" ? (
            <>
              <EditNavbar />
              <AddNavbarButtons
                AutoADDForm={showAddI}
                onClick={showAddI}
                close={location === "/invoice" ? showInvoiceInput : showAddI}
              />
              <Download />
              <Search onClick={showAddInput} />
            </>
          ) : (
            <> </>
          )}
          {location === "/mail" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={showAddIm}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>
          )}
        </div>

        <Link to={"/profile"}>
          <div
            id="profil"
            className="flex w-12 h-12  ml-8 p-2 bg-[#313538] rounded-full"
          ></div>
        </Link>
      </div>
    </>
  );
};

export default NavbarTopButton;
