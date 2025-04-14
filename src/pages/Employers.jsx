import React from "react";
import Layout from "../components/Layout/Layout";
import { CardTable } from "../components/Card/CardTable";
import { useADDNavbar } from "../Context/AddNavbarContext";
import FormInput from "../components/Form/FormInput";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading";
import api from "../util/api";

const Employers = () => {
  const { showAdd, showAddI } = useADDNavbar();

  const fetchEmployers = async () => {
    try {
      const res = await (await api()).get("/emp/all");
      return res.data;
    } catch (error) {
      console.error("Error fetching employers:", error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["employers"],
    queryFn: fetchEmployers,
    onError: (error) => {
      console.error("Error fetching employers:", error);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Layout>
        {showAdd && (
          <FormInput
            fields="Employers"
            textOne="name"
            textTwo="surname"
            textThree="email"
            textFour="phone"
            textFive="salary"
            close={() => showAddI()}
          />
        )}
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">Employers</h1>
          {isLoading && <Loading />}

          {data && (
            <CardTable
              thead_one="name"
              thead_two="surname"
              thead_three="email"
              thead_four="phone"
              thead_five="salary"
              data={data.users.map((user) => ({
                tbody_one: user.name,
                tbody_two: user.surname,
                tbody_three: user.email,
                tbody_four: user.phone,
                tbody_five: user.salary,
              }))}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Employers;
