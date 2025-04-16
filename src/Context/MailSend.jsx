"use client";
import React from "react";

const Context = React.createContext();

const MailContext = ({ children }) => {
  const [showAddMail, setShowAddMail] = React.useState(false);

  const toggleAddMail = () => {
    setShowAddMail(!showAddMail);
  };

  return (
    <Context.Provider value={{ showAddMail, toggleAddMail }}>
      {children}
    </Context.Provider>
  );
};

const useMail = () => React.useContext(Context);

export { MailContext, useMail };
