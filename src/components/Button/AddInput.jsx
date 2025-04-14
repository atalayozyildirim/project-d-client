import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../util/api";

export default function AddInput(close) {
  const [prompt, setPrompt] = React.useState("");
  const [datas, setData] = React.useState([]);

  const router = useNavigate();
  const pathname = router.pathname;

  const handlePrompt = (e) => {
    if (e.key === "Enter") {
      handleClickButton();
    }
  };
  const handleClickButton = async () => {
    const filterPrompt = prompt.replace(/<[^>]*>?/gm, "");
    let res;
    switch (pathname) {
      case "/employers":
        res = await api("Atalay").get(`api/emp/search?s=${filterPrompt}`);
        setData(res.data);
        break;
      case "/customers":
        res = await api("Atalay").get(`api/customer/search?s=${filterPrompt}`);
        setData(res.data);
        break;
    }
  };

  console.log(datas);
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handlePrompt}
        className="top-0 left-1/2 ml-5 text-white fixed z-[50] transform -translate-x-1/2 w-1/2 outline-none  bg-[#141517] shadow-lg h-14 p-1 mt-2 rounded-3xl flex justify-between items-center pr-10"
      />
      <div className="top-5 mt-1 ml-2 left-[65rem] w-8 fixed z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={close}
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
