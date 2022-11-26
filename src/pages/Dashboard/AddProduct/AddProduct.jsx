import { Listbox } from "@headlessui/react";
import { ArchiveBoxIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import SelectCategory from "./SelectCategory";

export default function AddProduct() {
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
    // console.log(data);
    const { image, ...rest } = data;
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
        console.log(dataImg);
        if (dataImg.data.url) {
          const productInfo = {
            ...rest,
            condition: productCondition,
            category: selected.name,
            categoryId: selected._id,
            seller: user?.displayName,
            advertised: false,
            img: dataImg.data.url,
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
                alert("product added");
              }
            });
        }
      });
  };
  if (isLoading) return <div>Loading</div>;
  if (error) return;
  return (
    <section class="bg-gray-100">
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit(handleAddProduct)} class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="sr-only" htmlFor="product-name">
                  Book Name
                </label>
                <input
                  {...register("name", {
                    required: true,
                  })}
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Book Name"
                  type="text"
                  id="product-name"
                />
              </div>
              <div>
                <label class="sr-only" htmlFor="writer">
                  Writer
                </label>
                <input
                  {...register("writer", {
                    required: true,
                  })}
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
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
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
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
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Original Price"
                  type="text"
                  id="orginalPrice"
                />
              </div>

              <div>
                <label class="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  {...register("mobile", {
                    required: true,
                  })}
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
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
                <label class="sr-only" htmlFor="yearsofuse">
                  Year of purchase
                </label>
                <input
                  {...register("yearsOfUse", {
                    required: true,
                  })}
                  class="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Years of Use"
                  id="yearsofuse"
                ></input>
              </div>
              <div>
                <label class="sr-only" htmlFor="location">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: true,
                  })}
                  class="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Your Location"
                  id="location"
                ></input>
              </div>
              <div class="flex items-center">
                <label
                  for="dropzone-file"
                  class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-1 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-500"
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

                  <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Book's Picture
                  </h2>

                  <p class="mt-2 text-gray-500 tracking-wide">
                    Upload your file SVG, PNG, JPG or GIF
                  </p>

                  <input
                    {...register("image", { required: true })}
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-gray-800 ml-2 text-xl">Condition</h3>
                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 w-fit">
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

            <div class="mt-4">
              <button
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-lg bg-black hover:bg-primary duration-300 px-5 py-3 text-white sm:w-auto group"
              >
                <span class="font-medium"> Add Product </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-3 h-5 w-5 group-hover:translate-x-1 duration-200"
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
