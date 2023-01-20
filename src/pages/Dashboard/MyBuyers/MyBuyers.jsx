import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";

export default function MyBuyers() {
  const navigate = useNavigate();
  const {
    isLoading,
    data: myBuyers,
    error,
  } = useQuery({
    queryKey: ["my-buyers"],
    queryFn: () =>
      fetch(`https://rebook-server.vercel.app/my-buyers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) return <Loader />;
  if (error) return navigate("/error");
  return (
    <>
      {myBuyers.length > 0 ? (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Customer name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Purchased Product
              </th>
            </tr>
          </thead>
          <tbody>
            {myBuyers.map(({ _id, name, soldTo, customerEmail, photoURL }) => (
              <tr
                key={_id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Purchased By
                  </span>
                  {soldTo}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  {customerEmail}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Product
                  </span>
                  {name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoItems page={"My Buyers"} />
      )}
    </>
  );
}
