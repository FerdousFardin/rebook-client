import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";

export default function ReportedItems() {
  const navigate = useNavigate();
  const {
    isLoading,
    data: reportedItems,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reported-items"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/reported-items`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) return <Loader />;
  if (error) return navigate("/error");
  return (
    <>
      {reportedItems.length > 0 ? (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Product name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Category
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
            {reportedItems.map(
              ({ _id, name, category, isReported, resalePrice }) => (
                <tr
                  key={_id}
                  className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                >
                  <td className="w-full lg:w-fit lg:max-w-xs p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Product name
                    </span>
                    {name}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Category
                    </span>
                    {category}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Price
                    </span>
                    ${resalePrice}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    {isReported && (
                      <span className="rounded bg-red-800 text-gray-100 flex items-center w-fit mx-auto py-2 px-3 text-xs font-bold">
                        <ExclamationCircleIcon className="w-5 h-5" /> Reported
                      </span>
                    )}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <DeleteBtn
                      {...{ refetch, name, _id, fetchLink: "products" }}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <NoItems
          page={"Reported Items"}
          message={"Maybe everyone likes our product."}
        />
      )}
    </>
  );
}
