import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function AllSellers() {
  const {
    isLoading,
    data: allSellers,
    error,
    fetchStatus,
    refetch,
  } = useQuery({
    queryKey: ["all-sellers"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/all-sellers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("user deleted");
          refetch();
        }
      });
  };
  const handleVerify = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/users?verify=true`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("verified");
          refetch();
        }
      });
  };
  if (isLoading) return <div>Loading</div>;
  if (error) return;

  return (
    <table class="border-collapse w-full">
      <thead>
        <tr>
          <th class="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"></th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Seller name
          </th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Seller email
          </th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Status
          </th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {fetchStatus !== "fetching" ? (
          allSellers.map(({ name, _id, email, isVerified, photoURL }) => (
            <tr
              key={_id}
              class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td class="w-full lg:w-auto p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                <img src={photoURL} className="w-10 rounded-full" alt="" />
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Seller name
                </span>
                {name}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Seller email
                </span>
                {email}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Status
                </span>
                {isVerified ? (
                  <span class="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                    Verified
                  </span>
                ) : (
                  <span class="rounded text-gray-50 bg-red-500 py-1 px-3 text-xs font-bold">
                    Not verified
                  </span>
                )}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                {isVerified ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleVerify(_id)}
                    class="text-blue-400 hover:text-blue-600 underline pl-6"
                  >
                    Verify
                  </button>
                )}
                <button
                  onClick={() => handleDelete(_id)}
                  class="ml-4 text-blue-400 hover:text-blue-600 underline pl-6"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <div>Loading</div>
        )}
      </tbody>
    </table>
  );
}
