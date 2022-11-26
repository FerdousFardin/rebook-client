import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function MyProducts() {
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    data: myProducts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-products"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/my-products`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const handleAdvertise = (_id) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/my-products?advertised=true`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("Advertised");
          refetch();
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };
  if (isLoading) return <div>Loading</div>;
  if (error) return;
  //   console.log(myProducts);
  return (
    <table class="border-collapse w-full">
      <thead>
        <tr>
          <th class="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Product name
          </th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Category
          </th>
          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Price
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
        {myProducts.map(
          ({ name, _id, category, resalePrice, advertised, inStock }) => (
            <tr
              key={_id}
              class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td class="w-full lg:w-fit lg:max-w-xs p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Product name
                </span>
                {name}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Category
                </span>
                {category}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Price
                </span>
                ${resalePrice}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Status
                </span>
                {inStock ? (
                  <span class="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                    Available
                  </span>
                ) : (
                  <span class="rounded text-gray-50 bg-red-500 py-1 px-3 text-xs font-bold">
                    Stock Out!
                  </span>
                )}
              </td>
              <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                {advertised ? (
                  <span class="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                    Advertised
                  </span>
                ) : inStock ? (
                  <button
                    onClick={() => handleAdvertise(_id)}
                    class="text-blue-400 hover:text-blue-600 underline pl-6"
                  >
                    Advertise
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
