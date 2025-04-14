import React from "react";

const Context = React.createContext();

const ChartContextProvider = ({ children }) => {
  const [value, setValue] = React.useState("Chart");

  const selectedChartValue = (value) => {
    setValue(value);
  };
  return (
    <Context.Provider value={{ selectedChartValue, value }}>
      {children}
    </Context.Provider>
  );
};

// Removed useChartContext from this file to comply with Fast Refresh rules

export const useChartContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useChartContext must be used within a ChartContextProvider"
    );
  }
  return context;
};
export { ChartContextProvider };
