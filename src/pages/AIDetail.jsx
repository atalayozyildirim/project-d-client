import React from "react";
import Layout from "../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api";
import Loading from "../components/Layout/Loading";

export const AIDetail = () => {
  const fetchAI = async () => {
    const res = await (await api()).get("/ai/monthly/sales/analyze");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching AI");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["AI"],
    queryFn: fetchAI,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching AI:", error);
    },
  });

  if (isLoading) return <Loading />;
  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen w-screen p-10">
          <h1 className="text-2xl font-bold">AI </h1>
          <p className="text-gray-700">No data available</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">AI </h1>

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Monthly Sales Analysis</h2>
              <p className="text-gray-700">{data?.monthlySalesAnalysis}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Customer Feedback</h2>
              <p className="text-gray-700">{"test"}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Sales Trends</h2>
              <p className="text-gray-700">{"test"}</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
