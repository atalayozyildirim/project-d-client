import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { CardTable } from "../components/Card/CardTable.jsx";
import { useADDNavbar } from "../Context/AddNavbarContext.jsx";
import Invoice from "../components/Form/Invoice.jsx";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading.jsx";
import api from "../util/api.js";

const InvoicePage = () => {
  const { showAddI, showAdd } = useADDNavbar();

  const fetchInvoice = async () => {
    const res = (await api()).get("/invoice/all");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching invoice");
  };

  const { data, error } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoice,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Layout>
        {showAdd && <Invoice closeInvoice={showAddI} />}
        <div className="min-h-screen w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">
            Invoice Details
          </h1>

          {error && (
            <div className="text-red-500">
              <p>Error: {error.message}</p>
            </div>
          )}
          {data && (
            <CardTable
              thead_one="Item"
              thead_two="Description"
              thead_three="Quantity"
              thead_four="Price"
              data={data}
            />
          )}
        </div>
      </Layout>
    </>
  );
};
export default InvoicePage;
