import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

export default function HomeCategories() {
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
  if (isLoading) return <div className="text-7xl">Loading</div>;
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        {/* <!-- text - start --> */}
        <div className="mb-10 md:mb-16">
          <h2
            id="categories"
            className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6"
          >
            Our Collections
          </h2>

          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>
        {/* <!-- text - end --> */}

        <div className="grid sm:grid-cols-2 gap-6">
          {/* <!-- product - start --> */}
          {categories.map(({ _id, name, img }) => (
            <Link
              key={_id}
              to={`/category/${_id}`}
              className="group h-80 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4"
            >
              <img
                src={img}
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
              />

              <div className="bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50 absolute inset-0 pointer-events-none"></div>

              <div className="flex flex-col relative">
                <span className="text-gray-300">Category</span>
                <span className="text-white text-lg lg:text-xl font-semibold">
                  {name}
                </span>
              </div>
            </Link>
          ))}
          {/* <!-- product - end --> */}
        </div>
      </div>
    </div>
  );
}
