import { Listbox } from "@headlessui/react";
import { ArchiveBoxIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthProvider";
import SelectCategory from "./SelectCategory";
const placeholder = {
  name: "Please Select a Category.",
};
export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`https://rebook-server.vercel.app/categories`).then((res) =>
        res.json()
      ),
  });
  const [productCondition, setProductCondition] = useState("Fair");
  const [selected, setSelected] = useState(placeholder);

  const activeClass =
    "flex justify-center w-full px-3 py-2 text-white bg-primary rounded-md md:w-auto md:mx-2 focus:outline-none";
  const inActiveClass =
    "flex justify-center w-full px-3 py-2 mt-4 text-primary border border-primary rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-primary dark:text-primary/25 focus:outline-none";
  const handleSelect = (e, quality) => {
    e.preventDefault();
    setProductCondition(quality);
  };
  const { register, handleSubmit, formState: errors } = useForm();
  const handleAddProduct = (data, e) => {
    setLoading(true);
    if (selected === placeholder.name || selected === placeholder) {
      setLoading(false);
      return toast.error("Please select a category.");
    }
    const { image, yearsOfPurchase, ...rest } = data;
    const formData = new FormData();
    formData.append("image", image[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbb_apikey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((dataImg) => {
        if (dataImg.data.url) {
          const productInfo = {
            ...rest,
            condition: productCondition,
            category: selected.name,
            categoryId: selected._id,
            seller: user?.displayName,
            advertised: false,
            img: dataImg.data.url,
            yearsOfUse: format(Date.now(), "y") - yearsOfPurchase,
            inStock: true,
            date: Date.now(),
          };
          fetch(`https://rebook-server.vercel.app/products`, {
            method: "POST",
            headers: {
              authorization: `bearer ${localStorage.getItem("rebookToken")}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                toast.success(`${selected.name} added to product listings`);
                e.target.reset();
                toast.success(
                  `${rest.name} added to product listings successfully.`
                );
                navigate("/dashboard/my-products");
              }
            });
        }
      })
      .catch((er) => {
        toast.error(
          `${image[0].name} couldn'e be uploaded! Try uploading another if it fails again.`
        );
        toast.success(
          `${rest.name} couldn't be added to product listings! Try again.`
        );
        console.error(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading) return <Loader />;
  if (error) return;
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="product-name">
                  Book Name
                </label>
                <input
                  {...register("name", {
                    required: "You must provide product name",
                  })}
                  className="w-full rounded-lg border-primary/20 p-3 text-sm border"
                  placeholder="Book Name"
                  type="text"
                  id="product-name"
                />
                {errors.name && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="sr-only" htmlFor="writer">
                  Writer
                </label>
                <input
                  {...register("writer", {
                    required: "You must provide writer name",
                  })}
                  className="w-full rounded-lg border-primary/20 p-3 text-sm border"
                  placeholder="Writer"
                  id="writer"
                ></input>
                {errors.writer && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.writer.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-gray-800 sr-only" htmlFor="email">
                  Resale Price
                </label>
                <input
                  {...register("resalePrice", {
                    required: "You must provide resale price",
                  })}
                  className="w-full rounded-lg border-primary/20 p-3 text-sm border"
                  placeholder="Resale Price"
                  type="text"
                  id="resalePrice"
                />
                {errors.resalePrice && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.resalePrice.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-gray-800 sr-only" htmlFor="email">
                  Orginal Price
                </label>
                <input
                  {...register("originalPrice", {
                    required: "You must provide original price",
                  })}
                  className="w-full rounded-lg border-primary/20 p-3 text-sm border"
                  placeholder="Original Price"
                  type="text"
                  id="orginalPrice"
                />
                {errors.originalPrice && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.originalPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  {...register("mobile", {
                    required: "You must provide your mobile number",
                  })}
                  className="w-full rounded-lg border-primary/20 p-3 text-sm border"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                />
                {errors.mobile && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <Listbox value={selected} onChange={setSelected}>
                  <SelectCategory {...{ selected, categories }} />
                </Listbox>
              </div>
              <div>
                <label className="sr-only" htmlFor="yearsOfPurchase">
                  Year of purchase
                </label>
                <input
                  {...register("yearsOfPurchase", {
                    required: "You must provide when it was purchased",
                  })}
                  className="w-full rounded-lg border border-primary/20 p-3 text-sm"
                  placeholder="Year of Purchase"
                  id="yearsOfPurchase"
                ></input>
                {errors.yearsOfPurchase && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.yearsOfPurchase.message}
                  </p>
                )}
              </div>
              <div>
                <label className="sr-only" htmlFor="location">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: "You must provide your location",
                  })}
                  className="w-full rounded-lg border border-primary/20 p-3 text-sm"
                  placeholder="Your Location"
                  id="location"
                ></input>
                {errors.location && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-gray-800 ml-2 text-xl">Condition</h3>
                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 w-fit">
                  <button
                    onClick={(e) => handleSelect(e, "Fair")}
                    className={
                      productCondition === "Fair" ? activeClass : inActiveClass
                    }
                  >
                    <ArchiveBoxIcon className="w-6 h-6" />
                    <span className="mx-2">Fair</span>
                  </button>
                  <button
                    onClick={(e) => handleSelect(e, "Good")}
                    className={
                      productCondition === "Good" ? activeClass : inActiveClass
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="mx-2">Good</span>
                  </button>
                  <button
                    onClick={(e) => handleSelect(e, "Excellent")}
                    className={
                      productCondition === "Excellent"
                        ? activeClass
                        : inActiveClass
                    }
                  >
                    <FaceSmileIcon className="w-6 h-6" />
                    <span className="mx-2">Excellent</span>
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="dropzone-file"
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-1 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Book's Picture
                  </h2>

                  <p className="mt-2 text-gray-500 tracking-wide">
                    Upload your file SVG, PNG, JPG or GIF
                  </p>

                  <input
                    {...register("image", {
                      required: "You must provide a picture of your product",
                    })}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
                {errors.image && (
                  <p className="ml-5 text-yellow-600 text-sm mt-2 ">
                    *{errors.image.message}
                  </p>
                )}
              </div>
              <div>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "You must provide a description",
                  })}
                  className="w-full rounded-lg border border-primary/20 p-3 text-sm"
                  placeholder="Product description"
                  rows={"5"}
                  id="description"
                ></textarea>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-black hover:bg-primary disabled:cursor-not-allowed disabled:bg-black/40 duration-300 px-5 py-3 text-white sm:w-auto group"
              >
                <span className="font-medium">
                  {loading && (
                    <div className="grid-1 my-auto h-5 w-5 mr-3 border-t-transparent border-solid animate-spin rounded-full border-white border"></div>
                  )}
                  {!loading ? "Add Product" : `Adding Product`}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-5 w-5 group-hover:translate-x-1 duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
