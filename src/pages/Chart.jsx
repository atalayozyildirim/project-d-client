import React from "react";
import Layout from "../components/Layout/Layout";
import Charts from "../components/Charts/Chart";
import SelectBox from "../components/SelectBox/SelectBox";
const Chart = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">Charts</h1>
          <SelectBox className="flex w-full flex-row justify-end  align-middle" />
          <Charts />
        </div>
      </Layout>
    </>
  );
};
export default Chart;
