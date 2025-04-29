import React from "react";
import Layout from "../components/Layout/Layout";
import { useADDNavbar } from "../Context/AddNavbarContext";
import FormInput from "../components/Form/FormInput";
import Badge from "../components/Badge/Badge";
import api from "../util/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading";
import { Link } from "react-router-dom";

const TaskPage = () => {
  const { showAddI, showAdd } = useADDNavbar();

  const fetchTask = async () => {
    const res = await (await api()).get("/task/all");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching tasks");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTask,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching tasks:", error);
    },
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <Layout>
        {showAdd && (
          <FormInput
            fields="Tasks"
            textOne="Title"
            textTwo="Description"
            textThree="AssignedTo"
            textFour="Priority"
            textFive="DueDate"
            close={showAddI}
          />
        )}
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">All Task </h1>
          <div className="mt-5">
            <table className="table-auto w-full rounded-md">
              <thead className="border border-[#27272a]  text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Task-ID</th>
                  <th className="px-4 py-2 text-left w-1/3">Title</th>
                  <th className="px-4 py-2 text-left">Descriptipn</th>
                  <th className="px-4 py-2 text-left">assignedTo</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index} className="border-t border-[#27272a]">
                      <td className="px-4 py-2 hover:underline">
                        <Link to={`/tasks/${item._id}`}>{item.taskId}</Link>
                      </td>
                      <td className="px-4 py-2 w-1/2 hover:underline">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 hover:underline">
                        {item.description.length > 50
                          ? item.description.slice(0, 50) + "..."
                          : item.description}
                      </td>
                      <td className="px-4 py-2  hover:underline">
                        {item.assignedTo}
                      </td>
                      <td className="px-4 py-2 hover:underline">
                        {item.priority}
                      </td>
                      <td className="px-4 py-2 hover:underline">
                        {new Intl.DateTimeFormat("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(item.dueDate))}
                      </td>
                      <td className="px-4 py-2">
                        <Badge text={item.status} badgeIcon={true} />
                      </td>
                      <td className="px-4 py-2">
                        <>
                          <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                          >
                            Dropdown button{" "}
                            <svg
                              className="w-2.5 h-2.5 ms-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          <div
                            id="dropdown"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefaultButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Detail
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TaskPage;
