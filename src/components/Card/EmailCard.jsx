import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useEmailDetailContext } from "../../Context/EmailDetailContext";

export default function EmailCard({ data }) {
  const { handleSetShowDetailEmail } = useEmailDetailContext();
  return (
    <>
      {data &&
        data.map((email, index) => (
          <div
            key={index}
            className="w-full bg-transparent hover:bg-[#27272a] flex flex-col h-36 rounded-xl border border-[#27272a] mb-4"
          >
            <div className="p-2 ml-4 flex flex-col gap-2">
              <div className="flex justify-between items-center gap-10">
                <div
                  data-sender=""
                  onClick={() => {
                    handleSetShowDetailEmail(data[index]);
                  }}
                  className="text-md font-bold cursor-pointer hover:underline"
                >
                  {email?.from || "Atalay Özyıldırım"}
                </div>
                <div data-date className="flex text-sm mr-5">
                  {formatDistanceToNow(new Date(email?.date || new Date()), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-sm -mt-2 cursor-pointer">
                {email.subject || "Subject"}
              </div>
              <div className="text-sm text-gray-500">
                {email.text.length > 200
                  ? email?.text.substring(0, 200) + "..."
                  : email?.text}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
