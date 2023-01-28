import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HomeItems from "../../components/HomeItems/HomeItems";
import Loader from "../../components/Loader/Loader";

export default function HomeCategories() {
  const {
    isLoading,
    data: categories,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/categories`).then((res) =>
        res.json()
      ),
  });
  const [idx, setIdx] = useState(0);
  const handleIdxClick = (id) => {
    setIdx(id);
    refetch();
  };
  if (isLoading) return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (error) return;
  const id = categories[idx]._id;
  if (!isLoading || !isFetching)
    return (
      <div
        id="category"
        className="bg-white py-6 sm:py-8 lg:py-12 md:px-10 lg:px-28"
      >
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          {/* <!-- text - start --> */}
          <div className="mb-10 md:mb-16">
            <h2
              id="categories"
              className="text-3xl lg:text-5xl md:text-4xl sm:text-2xl text-center mb-4 md:mb-6"
            >
              Our Top Collections
            </h2>

            <p className="max-w-screen-md lg:text-2xl md:text-xl text-lg  sm:leading-relaxed text-gray-800 text-center mx-auto">
              Take a look at some of the Top Categories of Books.
            </p>
          </div>
          {/* <!-- text - end --> */}
          <div className="">
            <div className="flex gap-6 justify-center rounded-md ">
              {/* <!-- product - start --> */}
              {categories.map((category, catIdx) => (
                <button
                  key={category._id}
                  onClick={() => handleIdxClick(catIdx)}
                  className={`group lg:w-60 flex items-end bg-gray-100 rounded-lg overflow-hidden relative p-4 hover:shadow-[0px_0px_3px_2px] shadow-primary hover:shadow-primary duration-200 ${
                    catIdx === idx ? "shadow-[0px_0px_3px_5px]" : ""
                  }`}
                >
                  <img
                    src={category.img}
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                  />

                  <div className="bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent opacity-50 absolute inset-0 pointer-events-none"></div>

                  <div className="flex flex-col relative">
                    <span className="text-gray-100  text-lg lg:text-xl font-semibold">
                      {category.name}
                    </span>
                  </div>
                </button>
              ))}
              {/* <!-- product - end --> */}
            </div>
            {!isFetching ? (
              <HomeItems id={id} />
            ) : (
              <div className="max-w-screen-2xl">
                <Loader color={"#000"} className={"h-52"} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
