import React from "react";
import { useLoaderData } from "react-router-dom";

export default function CategoryProduct() {
  const products = useLoaderData();
  return (
    <div class="py-12">
      <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="mb-12 space-y-2 text-center">
          <h2 class="text-3xl font-bold text-primary md:text-4xl dark:text-white">
            {products[0].category}
          </h2>
          <p class="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
            Buy used books under{" "}
            <span className="text-gray-800">{products[0].category}</span>{" "}
            category
          </p>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <div
              key={product._id}
              class="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10"
            >
              <div class="relative overflow-hidden rounded-xl">
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  width="1000"
                  height="667"
                  class="h-96 w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>
              <div class="mt-6 relative">
                <h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h3>
                <h3 class="text-lg font-semibold text-gray-700 dark:text-white">
                  by {product.writer}
                </h3>
                <p class="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                  {product.description.slice(0, 150)}...
                </p>
                <a class="inline-block" href="#">
                  <span class="text-primary">Book Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
