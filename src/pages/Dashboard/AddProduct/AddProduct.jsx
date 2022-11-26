import { Listbox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SelectCategory from "./SelectCategory";

export default function AddProduct() {
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
  const [selected, setSelected] = useState(categories[0]);

  const activeClass =
    "flex justify-center w-full px-6 py-3 text-white bg-primary rounded-md md:w-auto md:mx-2 focus:outline-none";
  const inActiveClass =
    "flex justify-center w-full px-6 py-3 mt-4 text-primary border border-primary rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-primary dark:text-primary/25 focus:outline-none";
  const handleSelect = (e, quality) => {
    e.preventDefault();
    setProductCondition(quality);
  };

  if (isLoading) return <div>Loading</div>;
  if (error) return;
  return (
    <section class="bg-gray-100">
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form class="space-y-4">
            <div>
              <label class="sr-only" htmlFor="product-name">
                Product Name
              </label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Product Name"
                type="text"
                id="product-name"
              />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="sr-only" htmlFor="email">
                  Resale Price
                </label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Resale Price"
                  type="text"
                  id="resalePrice"
                />
              </div>
              <div>
                <label class="sr-only" htmlFor="email">
                  Orginal Price
                </label>
                <input
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
            </div>

            <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              <button
                onClick={(e) => handleSelect(e, "Fair")}
                className={
                  productCondition === "Fair" ? activeClass : inActiveClass
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
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
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="mx-2">Good</span>
              </button>
              <button
                onClick={(e) => handleSelect(e, "Excellent")}
                className={
                  productCondition === "Excellent" ? activeClass : inActiveClass
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="mx-2">Excellent</span>
              </button>
            </div>

            <div>
              <label class="sr-only" htmlFor="message">
                Message
              </label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Message"
                rows="8"
                id="message"
              ></input>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
              >
                <span class="font-medium"> Send Enquiry </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-3 h-5 w-5"
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
