import React from "react";
import { Link, useLocation } from "react-router-dom";
export const CardTable = ({
  data,
  thead_one,
  thead_two,
  thead_three,
  thead_four,
  thead_five,
  thead_six,
  thead_eight,
}) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="w-full ml-1- mt-5 bg-transparent min-h-screen justify-center items-center">
        <div className="overflow-x-auto">
          <table className="min-w-full text-white rounded-xl">
            <thead className="bg-[#141517]">
              <tr>
                <th className="py-2 px-4 text-left">{thead_one}</th>
                <th className="py-2 px-4 text-left">{thead_two}</th>
                <th className="py-2 px-4 text-left">{thead_three}</th>
                <th className="py-2 px-4 text-left">{thead_four}</th>
                <th className="py-2 px-4 text-left">{thead_five}</th>
                {window.location.pathname === "/invoice" && (
                  <>
                    <th className="py-2 px-4 text-left">{thead_six}</th>
                    <th className="py-2 px-4 text-left">{thead_eight}</th>
                  </>
                )}
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="atalay">
              {data &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#141517]"
                    data-id={item.tbody_id}
                  >
                    {pathname == "/invoice" ? (
                      <Link
                        to={`/invoice/${item.tbody_id}`}
                        className="cursor-pointer"
                      >
                        <td className="py-2 px-4">{item.tbody_one}</td>
                      </Link>
                    ) : (
                      <td className="py-2 px-4">{item.tbody_one}</td>
                    )}
                    <td className="py-2 px-4">{item.tbody_two}</td>
                    <td className="py-2 px-4">{item.tbody_three}</td>
                    <td className="py-2 px-4">{item.tbody_four}</td>
                    <td className="py-2 px-4">{item.tbody_five}</td>
                    {window.location.pathname === "/invoice" && (
                      <>
                        <td className="py-2 px-4">{item.tbody_six}</td>
                        <td className="py-2 px-4">{item.tbody_eight}</td>
                      </>
                    )}
                    <td className="py-2 px-4"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
