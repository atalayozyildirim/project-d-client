import React from "react";
import Layout from "../components/Layout/Layout";
import DetailCard from "../components/Card/CardDetailChart";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import api from "../util/api";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement // Doughnut ve Pie grafikleri için gerekli
);
export default function Home() {
  const fetchDashboardData = async () => {
    const res = await (await api()).get("/charts/total");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching dashboard data");
  };

  const fetchTopProducts = async () => {
    const res = await (await api()).get("/charts/topSellingProducts");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching top products data");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    refetchOnWindowFocus: false,
  });

  const { data: topList } = useQuery({
    queryKey: ["topProducts"],
    queryFn: fetchTopProducts,
    refetchOnWindowFocus: false,
  });

  const { data: GainExpense } = useQuery({
    queryKey: ["gainExpense"],
    queryFn: async () => {
      const res = await (await api()).get("/charts/monthGain");
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Error fetching gain and expense data");
    },
    refetchOnWindowFocus: false,
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Gain vs Expense",
        color: "white",
      },
    },
    layout: {
      padding: 20,
    },
  };
  const chartData = {
    labels: ["Gain", "Expense"],
    datasets: [
      {
        data: GainExpense ? [GainExpense.gain, GainExpense.expense] : [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  if (isLoading) return <Loading />;

  return (
    <>
      <Layout>
        <div className="p-10 w-full min-h-screen">
          <h1 className="text-xl font-bold hover:underline">Home</h1>
          {error && (
            <div className="text-red-500">
              <p>Error: {error.message}</p>
            </div>
          )}
          <div className="flex flex-row gap-2 mt-4">
            {data && (
              <>
                <DetailCard
                  title="Total Customers"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  }
                  value={data.totalCustomers}
                />

                <DetailCard
                  title="Total Sales"
                  value={data.totalInvoices}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  }
                />
                <DetailCard
                  title="Total Employers"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  }
                  value={data.totalEmployers}
                />
                {
                  <DetailCard
                    title="Top Selling Products"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v18m9-9H3m18 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    }
                    value={
                      topList &&
                      topList.map((item) => {
                        return (
                          <div key={item._id} className="flex flex-row gap-2">
                            <p>{item._id}</p>
                            <p>{item.total}</p>
                          </div>
                        );
                      })
                    }
                  />
                }
              </>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-full h-96 bg-black shadow-md rounded-xl p-4">
              <Doughnut data={chartData} options={options} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
