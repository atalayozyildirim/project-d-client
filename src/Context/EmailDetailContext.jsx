import React from "react";

const Context = React.createContext();

const EmailDetailComtext = ({ children }) => {
  const [showDetail, setShowDetail] = React.useState(false);
  const [showEmailDetail, setShowEmailDetail] = React.useState([]);

  const handleSetShowDetailEmail = (email) => {
    setShowDetail(!showDetail);
    setShowEmailDetail(email);
    console.log("showDetail", showDetail);
  };

  return (
    <Context.Provider
      value={{ showDetail, handleSetShowDetailEmail, showEmailDetail }}
    >
      {children}
    </Context.Provider>
  );
};

const useEmailDetailContext = () => React.useContext(Context);

export { useEmailDetailContext, EmailDetailComtext };
