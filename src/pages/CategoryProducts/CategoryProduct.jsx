import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  HandRaisedIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";
import BookModal from "./BookModal";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

export default function CategoryProduct() {
  const { id } = useParams();
  const {
    isLoading,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ["category-products"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/products?categoryId=${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const handleModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const handleReport = (id) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products?reported=true`, {
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
          toast.success("Item reported.");
          refetch();
        }
      })
      .finally(() => setLoading(false));
  };
  if (isLoading || loading) return <Loader />;
  if (error) return navigate("/error");
  return (
    <>
      <div className="py-12">
        <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <h2 className="text-3xl font-bold text-primary md:text-4xl dark:text-white">
              {products[0].category}
            </h2>
            <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
              Buy used books under{" "}
              <span className="text-gray-800">{products[0].category}</span>{" "}
              category
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    width="1000"
                    height="667"
                    className="h-96 w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 relative">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {product.name}
                  </h3>
                  <h3 className="text-lg font-thin text-gray-700 dark:text-white">
                    by {product.writer}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5">
                      <h3 className="text-lg flex items-center gap-1 font-thin text-gray-700 dark:text-white">
                        <MapPinIcon className="w-5 h-5" />
                        {product.location}
                      </h3>
                      <h3 className="text-lg flex items-center gap-1 font-thin text-gray-700 dark:text-white">
                        <CurrencyDollarIcon className="h-5 w-5" />
                        {product.originalPrice}
                        <small className="text-primary-100">
                          (Original Price)
                        </small>
                      </h3>
                      <h3 className="text-lg flex items-center gap-1 font-thin text-gray-700 dark:text-white">
                        <HandRaisedIcon className="h-5 w-5" />
                        {product.yearsOfUse} years
                      </h3>
                    </div>

                    {product.isReported ? (
                      <span className="px-5 py-2 bg-green-300 h-10 rounded-lg text-white">
                        Reported
                      </span>
                    ) : (
                      <button
                        onClick={() => handleReport(product._id)}
                        className="w-28 bg-warning hover:bg-yellow-500 h-10 rounded-lg text-white"
                      >
                        Report <FlagIcon className="inline w-5" />
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg flex items-center gap-1 font-thin text-gray-500 dark:text-white">
                    Listed at {format(product.date, "paa PP")} by{" "}
                    <strong className="hover:underline cursor-pointer hover:text-primary text-gray-800">
                      {product.seller}
                    </strong>
                    {product.isVerified && (
                      <span
                        className="inline-flex text-sm items-center rounded-full p-0.5 bg-blue-500 text-white group ease-linear duration-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        role="alert"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-1 group-focus:px-1">
                          Verified Seller
                        </span>
                      </span>
                    )}
                  </h3>
                  <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  {product.inStock ? (
                    <button
                      className="inline-block group  bg-primary-100/10 py-2 px-5 rounded-lg"
                      onClick={() => handleModal(product)}
                    >
                      <span className="text-primary flex gap-1 items-center">
                        Book Now for <strong>${product.resalePrice}</strong>
                        <ArrowRightIcon className="h-5 w-5 text-primary duration-300 group-hover:translate-x-1" />
                      </span>
                    </button>
                  ) : (
                    <span className="text-primary flex gap-1 items-center">
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      Stock Out!
                    </span>
                  )}
                </div>
              </div>
            ))}
            <BookModal {...{ isOpen, setIsOpen, Dialog, selectedProduct }} />
          </div>
        </div>
      </div>
    </>
  );
}
