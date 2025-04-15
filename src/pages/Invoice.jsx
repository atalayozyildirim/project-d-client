import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { CardTable } from "../components/Card/CardTable.jsx";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api.js";
import { format } from "date-fns";
const InvoicePage = () => {
  const fetchInvoice = async () => {
    const res = await (await api()).get("/invoice/all");
    if (res.status === 200) {
      return res.data.users;
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
              thead_one="Invoice ID"
              thead_two="Customer Name"
              thead_three="Customer Address"
              thead_four="Total"
              thead_five="Invoice Date"
              data={data.map((invoice) => ({
                tbody_one: invoice.invoiceNumber,
                tbody_two: invoice.customerName,
                tbody_three: invoice.customerAddress,
                tbody_four: invoice.total,
                tbody_five: format(new Date(invoice.invoiceDate), "dd/MM/yyyy"),
              }))}
            />
          )}
        </div>
      </Layout>
    </>
  );
};
export default InvoicePage;
