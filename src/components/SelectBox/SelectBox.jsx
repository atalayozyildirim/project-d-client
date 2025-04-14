import React from "react";
import { useChartContext } from "../../Context/ChartContext";

const SelectBox = () => {
  const { selectedChartValue } = useChartContext();

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    selectedChartValue(selectedValue);
  };
  return (
    <>
      <form className="max-w-sm mx-auto" onChange={handleChange}>
        <label
          htmlFor="chart-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="chart-select"
          defaultValue={"Choose a chart"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a chart</option>
          <option value="Sales">Sales</option>
          <option value="Revenue">Revenue Drop</option>
          <option value="Orders"> Orders</option>
          <option value="Customer">{"customer/monthly"}</option>
        </select>
      </form>
    </>
  );
};

export default SelectBox;
