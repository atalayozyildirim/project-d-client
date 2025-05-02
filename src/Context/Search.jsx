import React from "react";

const Context = React.createContext();

const SearchNavbarContext = ({ children }) => {
  const [showAddSearch, setShowSearch] = React.useState(false);

  const showAddSearchI = () => {
    setShowSearch(!showAddSearch);
  };

  return (
    <Context.Provider value={{ showAddSearchI, showAddSearch }}>
      {children}
    </Context.Provider>
  );
};

const useSearchNavbar = () => React.useContext(Context);

export { useSearchNavbar, SearchNavbarContext };
