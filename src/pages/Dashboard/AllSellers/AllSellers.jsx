import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";
import SmallBtn from "../../../components/SmallBtn/SmallBtn";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

export default function AllSellers() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

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
  const handleVerify = (id) => {
    setLoading(true);
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
          toast.success("Verified!");
          refetch();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loader />
      </div>
    );
  if (error) return;

  return (
    <>
      {allSellers.length > 0 ? (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"></th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Seller name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Seller email
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
            {fetchStatus !== "fetching" ? (
              allSellers.map(({ name, _id, email, isVerified, photoURL }) => (
                <tr
                  key={_id}
                  className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                >
                  <td className="w-full lg:w-auto p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    <img
                      src={photoURL}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Seller name
                    </span>
                    {name}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Seller email
                    </span>
                    {email}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    {isVerified ? (
                      <span className="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                        Verified
                      </span>
                    ) : (
                      <span className="rounded text-gray-50 bg-red-500 py-1 px-3 text-xs font-bold">
                        Not verified
                      </span>
                    )}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <div className="flex justify-center items-center gap-3">
                      {isVerified ? (
                        ""
                      ) : (
                        <SmallBtn
                          colorPref={"#007c89"}
                          handler={() => handleVerify(_id)}
                          loading={loading}
                          variants={["Verify", "Processing"]}
                        />
                      )}
                      <DeleteBtn
                        {...{ fetchLink: "users", _id, name, refetch }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      ) : (
        <NoItems page={"All Sellers"} message={"Try again later."} />
      )}
    </>
  );
}
