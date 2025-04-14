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
import { useState } from "react";
import { useChartContext } from "../../Context/ChartContext";

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
