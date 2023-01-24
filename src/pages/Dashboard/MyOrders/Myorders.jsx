import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Box from "../../../components/Box/Box";

import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";

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
  if (isLoading) return <Loader />;
  if (error) return;
  return (
    <>
      {myOrders.length > 0 ? (
        <Box>
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
                        className="bg-blue-700 hover:bg-blue-800 border border-gray-200 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-gray-100 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-10 h-3 fill-current"
                          viewBox="0 0 660 203"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"></path>
                          <path
                            d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
                            fill="#F2AE14"
                          ></path>
                        </svg>
                        Pay with Card
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      ) : (
        <NoItems
          page={"My Orders"}
          message={"Try ordering something from our home page."}
        />
      )}
    </>
  );
}
// active
//
