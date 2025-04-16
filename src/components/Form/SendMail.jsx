import React from "react";
import api from "../../util/api";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function MailInput({ close }) {
  const [data, setData] = React.useState({});
  const [click, setClick] = React.useState(false);

  const handleFetchSendMail = async () => {
    try {
      const response = await (await api()).post("/mail/sendEMail", data);

      return response.data;
    } catch {
      toast.error("Error sending email");
    }
  };

  const mutation = useMutation({
    mutationFn: handleFetchSendMail,
    mutationKey: ["sendMail"],
    onError: (error) => {
      if (error.response && error.response.data) {
        error.response?.data.errors.forEach((err) => {
          toast.error(`${err.msg} (${err.path})`);
        });
      } else if (error.response.message) {
        toast.error("Invalid credentials");
      }
    },
  });
  const sendMailClick = () => {
    mutation.mutate({ data });
    setClick(true);
    toast.success("Mail sent successfully");

    setTimeout(() => {
      close();
    }, 1500);
  };
  return (
    <div className="flex fixed top-0 left-0 w-full h-full z-49 justify-center items-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-[#171c1e] p-8 rounded-lg z-50 mt-4 relative shadow-lg w-full max-w-md">
        <div onClick={close} className="w-8 h-8 mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
            onClick={close}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <label
            htmlFor="input1"
            className="block text-sm font-medium text-gray-700"
          >
            {"To"}
          </label>
          <input
            type="text"
            id="input1"
            name="input1"
            placeholder={"To"}
            onChange={(e) => {
              setData({ ...data, to: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-gray-700"
          >
            {"Subject"}
          </label>

          <input
            type="text"
            id="input2"
            name="input2"
            placeholder={"Subject"}
            onChange={(e) => {
              setData({ ...data, subject: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-gray-700"
          >
            {"Text"}
          </label>

          <textarea
            type="text"
            id="input2"
            name="input2"
            placeholder={"Text"}
            onChange={(e) => {
              const input = e.target;
              input.style.height = "auto";
              input.style.height = `${input.scrollHeight}px`;
              setData({ ...data, text: input.value });
            }}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-6">
          <button
            type="button"
            onClick={sendMailClick}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            {...(click ? { disabled: true } : {})}
          >
            {click ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
