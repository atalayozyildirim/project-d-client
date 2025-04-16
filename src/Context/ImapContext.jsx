import React from "react";

const Context = React.createContext();

const ImapContext = ({ children }) => {
  const [showAddImap, setShowImap] = React.useState(false);

  const showAddIm = () => {
    setShowImap(!showAddImap);
  };

  return (
    <Context.Provider value={{ showAddIm, showAddImap }}>
      {children}
    </Context.Provider>
  );
};

const useImap = () => React.useContext(Context);

export { ImapContext, useImap };
