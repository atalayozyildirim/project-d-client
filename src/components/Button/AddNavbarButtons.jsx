import { useNavigate } from "react-router-dom";
import React from "react";

export default function AddNavbarButtons({ onClick, close, AutoADDForm }) {
  const router = useNavigate();

  return (
    <>
      <div className="" onClick={close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          onClick={router.pathname === "/invoice" ? onClick : AutoADDForm}
          className="size-10 p-2 cursor-pointer rounded-full hover:bg-[#313538] transition-colors duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </>
  );
}
