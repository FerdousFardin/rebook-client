import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

export default function Myorders() {
  const {
    isLoading,
    data: myOrders,
    error,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/my-orders`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return;
  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Product name
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Price
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Status
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {myOrders.map((myOrder) => (
          <tr
            key={myOrder._id}
            className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
          >
            <td className="w-full lg:w-fit lg:max-w-xs p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Product name
              </span>
              {myOrder.name}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Price
              </span>
              ${myOrder.resalePrice}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Status
              </span>
              {myOrder.isPaid ? (
                <span className="rounded bg-green-300 text-gray-700 py-1 px-3 text-xs font-bold">
                  paid
                </span>
              ) : (
                <span className="rounded text-gray-700 bg-yellow-200 py-1 px-3 text-xs font-bold">
                  pending
                </span>
              )}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Actions
              </span>

              {myOrder.isPaid ? (
                "-"
              ) : (
                <Link
                  to={`/dashboard/checkout/${myOrder._id}`}
                  className="text-blue-400 hover:text-blue-600 underline pl-6"
                >
                  Pay
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
// active
//
