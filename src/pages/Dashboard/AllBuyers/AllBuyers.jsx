import { useQuery } from "@tanstack/react-query";
import React from "react";

import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";

export default function AllBuyers() {
  const {
    isLoading,
    data: allBuyers,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/all-buyers`, {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (error) return;
  return (
    <>
      {allBuyers.length > 0 ? (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"></th>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Customer name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allBuyers.map(({ _id, name, email, photoURL }) => (
              <tr
                key={_id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-fit lg:max-w-xs p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={photoURL}
                    alt={name}
                  />
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Customer name
                  </span>
                  {name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  {email}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Actions
                  </span>

                  <DeleteBtn {...{ fetchLink: "users", _id, name, refetch }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoItems page={"All Buyers"} message={"Try again later."} />
      )}
    </>
  );
}
