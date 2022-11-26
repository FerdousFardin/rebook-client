import React from "react";
import { Link } from "react-router-dom";

export default function Advertised({ advertised }) {
  return (
    <div className="py-16">
      <div className="xl:container m-auto px-6 text-gray-500 md:px-12">
        <div>
          <h2 className="mt-4 text-2xl text-center font-bold text-gray-700 dark:text-white md:text-4xl">
            Advertised
          </h2>
          <h5 className="text-center mt-5 text-lg">
            Check out this week's latest books.
          </h5>
        </div>
        <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          {advertised.map((elem) => (
            <Link
              to={`/category/${elem.categoryId}`}
              key={elem._id}
              className="group relative shadow-sm bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
            >
              <div className="relative space-y-8 py-12 p-8">
                <img
                  src={elem.img}
                  className="w-20"
                  width="512"
                  height="512"
                  alt={elem.name}
                />

                <div className="space-y-2">
                  <h5 className="text-xl font-medium text-gray-700 dark:text-white transition group-hover:text-primary">
                    {elem.name}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {elem?.description?.length > 150
                      ? elem.description.slice(0, 150) + "..."
                      : elem?.description}
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-between group-hover:text-primary"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
