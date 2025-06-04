import React from "react";
import Layout from "../components/Layout/Layout";
import api from "../util/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading";
import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
  const params = useParams();

  const generatePDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  const fetchInvoiceDetails = async () => {
    try {
      const response = await (await api()).get("/invoice/" + params.id);
      if (response.status !== 200) {
        throw new Error("Failed to fetch invoice details");
      }
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchInvoiceDetails,
    queryKey: ["invoiceDetails", params.id],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Layout>
        {data &&
          data.map((items) => {
            return (
              <div className="min-h-screen w-screen p-10">
                <h1 className="text-2xl font-bold hover:underline">
                  Invoice Details
                </h1>
                <div
                  className="invoice-container bg-white absolute top-36 left-1/2 transform -translate-x-1/2  z-50"
                  id="invoice"
                >
                  <div className="invoice-header">
                    <div className="invoice-left">
                      <h1>INVOICE LOGO</h1>
                      <p>Date: {items.invoiceDate}</p>
                    </div>
                    <div className="invoice-right">
                      <p className="text-black font-bold">
                        Invoice No: {items.invoiceNumber}
                      </p>
                      <div className="qr-code-placeholder">QR CODE</div>
                    </div>
                  </div>
                  <div className="invoice-addresses">
                    <div className="from-address">
                      <h2>From</h2>
                      <p>
                        <input
                          type="text"
                          placeholder="Name"
                          className="bg-white text-black"
                        />
                      </p>
                      <p>
                        <textarea
                          placeholder="Address"
                          className="resize-none w-80 bg-white text-black"
                          style={{ height: "auto", overflow: "hidden" }}
                        />
                      </p>
                    </div>
                    <div className="to-address">
                      <h2>Bill To</h2>
                      <p>
                        {" "}
                        <input
                          type="text"
                          placeholder="Name"
                          className="bg-white text-black"
                          disabled
                          value={items.customerName}
                        />
                      </p>
                      <p>
                        <textarea
                          placeholder="Address"
                          className="resize-none w-80 bg-white text-black"
                          style={{ height: "auto", overflow: "hidden" }}
                          value={items.customerAddress}
                          disabled
                          onChange={(e) => {
                            const input = e.target;
                            input.style.height = "auto";
                            input.style.height = `${input.scrollHeight}px`;
                          }}
                        />
                      </p>
                    </div>
                  </div>
                  <table className="invoice-table border border-black">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items &&
                        items.items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                value={item.name}
                                placeholder="Description"
                                className="bg-white"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder="quantity"
                                className="bg-white"
                                value={item.quantity}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder="unit price"
                                className="bg-white"
                                value={item.price}
                                disabled
                              />
                            </td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="invoice-totals">
                    <div className="totals-row">
                      <span>Subtotal: </span>
                      <span></span>
                    </div>
                    <div className="totals-row font-bold">
                      <span>KDV : {"% 20"}</span>
                      <span></span>
                    </div>
                    <div className="totals-row total-amount">
                      <span>Total: {items.total}</span>
                      <span></span>
                    </div>
                  </div>
                  <button className="generate-pdf-button" onClick={generatePDF}>
                    Generate PDF
                  </button>
                </div>
              </div>
            );
          })}
      </Layout>
    </>
  );
};

export default InvoiceDetail;
