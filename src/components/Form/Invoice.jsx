import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../util/api";

export default function Invoice({ closeInvoice }) {
  const [name, setName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [customerAddress, setCustomerAddress] = useState("Customer Address");
  const [items, setItems] = useState([
    { description: "", quantity: 0, unitPrice: 0, total: 0 },
  ]);
  const [kdv, setKdv] = useState(20);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const autoInvoiceNumber = `INV-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR");
    setCurrentDate(formattedDate);
    setKdv(20);
    console.log(customerAddress, items, kdv, subTotal, totalAmount);
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [items, kdv]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    updatedItems[index].total =
      Number(updatedItems[index].quantity) *
      Number(updatedItems[index].unitPrice);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 0, unitPrice: 0, total: 0 },
    ]);
  };

  const calculateTotals = () => {
    const subTotal = items.reduce((sum, item) => sum + item.total, 0);
    setSubTotal(subTotal);
    const total = subTotal + (subTotal * kdv) / 100;
    setTotalAmount(total);
  };

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

  const postInvoice = async () => {
    try {
      const formattedItems = items.map((item) => ({
        productID: Math.floor(Math.random() * 1000),
        description: item.description,
        quantity: item.quantity,
        price: item.unitPrice,
      }));

      const payload = {
        invoiceNumber: autoInvoiceNumber,
        invoiceDate: new Date().toISOString().split("T")[0],
        customerName: name,
        customerAddress: customerAddress,
        items: formattedItems,
        total: totalAmount.toFixed(2),
        status: "pending",
      };
      const res = (await api()).post("/invoice/add", payload);

      if (res.status === 201) {
        closeInvoice();
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postInvoice,
    mutationKey: ["invoice"],
    onError: (error) => {
      console.error("Error posting invoice:", error);
    },
    onSuccess: (data) => {
      console.log("Invoice posted successfully:", data);
      queryClient.invalidateQueries(["invoice"]);
      closeInvoice();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["invoice"]);
    },
  });
  return (
    <>
      <div
        className="invoice-container bg-white absolute top-28 left-1/2 transform -translate-x-1/2 z-50"
        id="invoice"
      >
        <div className="invoice-header">
          <div className="invoice-left">
            <h1>INVOICE LOGO</h1>
            <p>Date: {currentDate}</p>
          </div>
          <div className="invoice-right">
            <p className="text-black font-bold">
              Invoice No: {autoInvoiceNumber}
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
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <textarea
                placeholder="Address"
                className="resize-none w-80 bg-white text-black"
                style={{ height: "auto", overflow: "hidden" }}
                onChange={(e) => {
                  const input = e.target;
                  input.style.height = "auto";
                  input.style.height = `${input.scrollHeight}px`;
                  setCustomerAddress(input.value);
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
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.description}
                    placeholder="Description"
                    className="bg-white"
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="quantity"
                    className="bg-white"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="unit price"
                    className="bg-white"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "unitPrice",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td>{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-button" onClick={addItem}>
          Add Item
        </button>
        <button className="add-item-button" onClick={() => mutation.mutate()}>
          {"Submit Invoice"}
        </button>
        <div className="invoice-totals">
          <div className="totals-row">
            <span>Subtotal:</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span>KDV (%{kdv}):</span>
            <span>{((subTotal * kdv) / 100).toFixed(2)}</span>
          </div>
          <div className="totals-row total-amount">
            <span>Total:</span>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <button className="generate-pdf-button" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </>
  );
}
