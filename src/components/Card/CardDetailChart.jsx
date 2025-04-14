import React from "react";

const DetailCard = ({ icon, title, value, id }) => {
  return (
    <>
      <div
        className="w-56 min-h-24 flex flex-col gap-2 p-4 bg-[#141517] rounded-xl shadow-md"
        data-key={id}
      >
        <div className="flex flex-row justify-start items-center gap-2">
          {title}
        </div>
        <div>
          <div className="flex flex-row justify-start items-center gap-2">
            {icon}
            <div className="dark:text-white">{value}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
