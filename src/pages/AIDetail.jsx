import Layout from "../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api";
import Loading from "../components/Layout/Loading";

export const AIDetail = () => {
  const fetchCustomerAnalsis = async () => {
    const res = await (await api()).get("/ai/customer/analyze/totalSpent");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching customer analysis");
  };

  const { data: dataCustomer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["AI_CUSTOMER_ANALYSIS"],
    queryFn: fetchCustomerAnalsis,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching customer analysis:", error);
    },
  });
  const fetchTask = async () => {
    const res = await (
      await api()
    ).get("/ai/task/recommendations/" + localStorage.getItem("id"));
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching AI task");
  };
  const { data: dataTask, isLoading: isLoadingTask } = useQuery({
    queryKey: ["AI_TASK"],
    queryFn: fetchTask,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching AI task:", error);
    },
  });

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

  if (isLoadingTask || isLoading || isLoadingCustomer) return <Loading />;
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
              <h2 className="text-xl font-bold">Next Monthly Sales Analysis</h2>
              <p className=" text-white ">
                {Math.floor(data?.nextMontlySales) + " units"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Recommended Task</h2>
              <p className="text-white">
                {dataTask?.description || "Not Found Task"}
              </p>
              <p className="text-white">
                {dataTask?.status || "Not Found Status"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Customer Anlysis</h2>
              <p className="text-white">
                {dataCustomer?.name || "Not Found Customer"}
              </p>
              <p className="text-white">
                {dataCustomer?.totalSpent || 0 + " units"}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
