import React, { useState, createContext, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../util/api";
import { toast } from "react-toastify";

const Context = createContext();

const FormContext = ({ children }) => {
  const [dataForm, setDataForm] = useState([]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ url, data }) => {
      const res = await (await api()).post(url, data);
      if (res.status === 201) {
        return data;
      } else {
        throw new Error("Error posting data");
      }
    },
    onSuccess: (data, variables) => {
      if (!variables.data.field) {
        console.error("Field bilgisi eksik");
        return;
      }
      setDataForm((prev) => [...prev, data]);
      queryClient.invalidateQueries([variables.data.field.toLowerCase()]);
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  const onSubmitData = async (data, field) => {
    try {
      if (!data || !field) {
        throw new Error("Data or field is missing");
      }
      let url = import.meta.env.VITE_BACKEND_URI;
      switch (field) {
        case "Employers":
          url += "/emp/add";
          break;
        case "Customers":
          url += "/customer/add";
          break;
        case "Tasks":
          url += "/task/add";
          break;
        case "Emails":
          url += "/mail/add";
          break;
        case "Imap":
          url += "/mail/imap/add";
          break;
        default:
          console.error("Invalid field");
          return;
      }

      await mutation.mutateAsync({ url, data });
      toast.success("Data submitted successfully");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message || error.message || "Unknown error";
      toast.error("Error submitting data: " + backendMessage);
      console.error("Error in onSubmitData:", error);
    }
  };

  return (
    <Context.Provider value={{ onSubmitData, dataForm, setDataForm }}>
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
export { FormContext };
