"use client";
import React from "react";

const Context = React.createContext();

const AddNavbarContext = ({ children }) => {
  const [showAdd, setShowAdd] = React.useState(false);

  const showAddI = () => {
    setShowAdd(!showAdd);
  };

  return (
    <Context.Provider value={{ showAddI, showAdd }}>
      {children}
    </Context.Provider>
  );
};

const useADDNavbar = () => React.useContext(Context);

export { useADDNavbar, AddNavbarContext };
