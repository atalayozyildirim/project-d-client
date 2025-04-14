import React from "react";
import Layout from "../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api";
import Loading from "../components/Layout/Loading";
const Notfication = () => {
  const fetchNotifications = async () => {
    const res = await (await api()).get("/notification/me");

    if (res.status !== 200) {
      throw new Error("Error fetching notifications");
    }
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching notifications</div>;
  return (
    <>
      <Layout>
        {" "}
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">
            Notifications {data.length}
          </h1>
          <div className="flex flex-col bg-[] gap-5 mt-5  w-full">
            {data.notifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-[#141517] p-5 rounded-xl flex flex-col gap-2"
              >
                <h1 className="text-xl font-bold">{notification.title}</h1>
                <p>{notification.message}</p>
                <p className="text-sm text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Notfication;
