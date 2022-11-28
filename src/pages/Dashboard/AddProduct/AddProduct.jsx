import { Listbox } from "@headlessui/react";
import { ArchiveBoxIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import SelectCategory from "./SelectCategory";

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
      fetch(`${import.meta.env.VITE_API_URL}/categories`).then((res) =>
        res.json()
      ),
  });
  const [productCondition, setProductCondition] = useState("Fair");
  const [selected, setSelected] = useState({
    name: "Please Select a Category.",
  });

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
    const { image, yearsOfPurchase, ...rest } = data;
    const formData = new FormData();
    formData.append("image", image[0]);
    setLoading(false);
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
          fetch(`${import.meta.env.VITE_API_URL}/products`, {
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
  if (isLoading) return <div>Loading</div>;
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
                    required: true,
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Book Name"
                  type="text"
                  id="product-name"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="writer">
                  Writer
                </label>
                <input
                  {...register("writer", {
                    required: true,
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Writer"
                  id="writer"
                ></input>
              </div>
              <div>
                <label className="text-gray-800 sr-only" htmlFor="email">
                  Resale Price
                </label>
                <input
                  {...register("resalePrice", {
                    required: true,
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Resale Price"
                  type="text"
                  id="resalePrice"
                />
              </div>
              <div>
                <label className="text-gray-800 sr-only" htmlFor="email">
                  Orginal Price
                </label>
                <input
                  {...register("originalPrice", {
                    required: true,
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Original Price"
                  type="text"
                  id="orginalPrice"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  {...register("mobile", {
                    required: true,
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                />
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
                    required: true,
                  })}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Year of Purchase"
                  id="yearsOfPurchase"
                ></input>
              </div>
              <div>
                <label className="sr-only" htmlFor="location">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: true,
                  })}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Your Location"
                  id="location"
                ></input>
              </div>
              <div className="flex items-center">
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
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                    {...register("image", { required: true })}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
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
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-black hover:bg-primary disabled:cursor-not-allowed disabled:bg-black/40 duration-300 px-5 py-3 text-white sm:w-auto group"
              >
                <span className="font-medium">
                  {loading && (
                    <svg
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#db3c26"
                      />
                    </svg>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
