import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useChartContext } from "../../Context/ChartContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../util/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [chartData, setChartData] = useState([]);

  const { value } = useChartContext();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: value || "Chart",
      },
    },
  };
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: value || "Chart",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const queryClient = useQueryClient();

  const fetchChartsData = async () => {
    try {
      const endpoint =
        value === "Sales"
          ? "/charts/total/sales"
          : value === "Orders"
          ? "/charts/totalInvoicesByMonth"
          : value === "Customer"
          ? "/charts/newCustomersByMonth"
          : value === "Revenue"
          ? "/charts/monthSalesRevenue"
          : "/charts/default";

      const response = await (await api()).get(endpoint);

      if (response.status !== 200) {
        throw new Error("Failed to fetch chart data");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: fetchChartsData,
    mutationKey: ["charts"],
    onSuccess: (data) => {
      setChartData(data);
      queryClient.setQueryData(["charts"], data);
    },
  });

  const handleFetchData = () => {
    mutation.mutate();
  };

  useEffect(() => {
    handleFetchData();

    return () => {
      setChartData([]);
    };
  }, [value]);
  return (
    <div className="min-h-screen w-full p-10 bg-transparent text-white">
      <div className="w-full max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-lg">
        <h1>{value}</h1>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
