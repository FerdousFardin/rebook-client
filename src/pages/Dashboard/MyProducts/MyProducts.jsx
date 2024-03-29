import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Box from "../../../components/Box/Box";

import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";
import SmallBtn from "../../../components/SmallBtn/SmallBtn";

export default function MyProducts() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        if (data.modifiedCount > 0) {
          toast.success("Item advertised.");
          refetch();
        }
      })
      .catch((er) => {
        console.error(er);
        toast.error("This item can not be advertised at this moment.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading) return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (error) return navigate("/error");
  return (
    <>
      {myProducts.length > 0 ? (
        <Box>
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
              {myProducts.map(
                ({ name, _id, category, resalePrice, advertised, inStock }) => (
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
                      {inStock ? (
                        <span className="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                          Available
                        </span>
                      ) : (
                        <span className="rounded text-gray-50 bg-red-500 py-1 px-3 text-xs font-bold">
                          Stock Out!
                        </span>
                      )}
                    </td>
                    <td className="w-full  lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Actions
                      </span>
                      {advertised ? (
                        <span className="rounded bg-green-600 text-gray-100 py-1 px-3 text-xs font-bold">
                          Advertised
                        </span>
                      ) : inStock ? (
                        <div className="mx-auto w-full flex justify-center">
                          <SmallBtn
                            loading={loading}
                            handler={() => handleAdvertise(_id)}
                            variants={["Advertise", "Wait"]}
                          />
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Box>
      ) : (
        <NoItems
          page={"My Products"}
          message={
            "Looks like you haven't added your products yet. Try adding one from Add Product page."
          }
        />
      )}
    </>
  );
}
