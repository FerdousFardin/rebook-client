import {
  ArrowRightIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  HandRaisedIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { CurrencyDollarIcon, FlagIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";
import BookModal from "./BookModal";
import toast from "react-hot-toast";

export default function CategoryProduct() {
  const products = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const handleModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const handleReport = (id) => {
    setLoading(true);
    fetch(`https://rebook-server.vercel.app/products?reported=true`, {
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
        }
      });
  };
  return (
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
                  Listed on {format(product.date, "PP")} by{" "}
                  <strong className="hover:underline cursor-pointer hover:text-primary text-gray-800">
                    {product.seller}
                  </strong>
                  {product.isVerified && (
                    <span className="text-xs text-center font-thin bg-blue-500 rounded-xl lg:px-1 py-px lg:py-0.5 text-white">
                      <CheckIcon className="h-3 w-3 inline-block" /> verified
                      seller
                    </span>
                  )}
                </h3>
                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
                {product.inStock ? (
                  <button
                    className="inline-block hover:translate-x-2 duration-300 bg-primary-100/10 py-2 px-5 rounded-lg"
                    onClick={() => handleModal(product)}
                  >
                    <span className="text-primary flex gap-1 items-center">
                      Book Now for <strong>${product.resalePrice}</strong>
                      <ArrowRightIcon className="h-5 w-5 text-primary" />
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
  );
}
