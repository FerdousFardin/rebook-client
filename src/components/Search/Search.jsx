import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Search() {
  const [shouldMount, setShouldMount] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLoading(true);
    const text = e.target.search.value;
    fetch(`${import.meta.env.VITE_API_URL}/products?find=${text}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .finally(() => setSearchLoading(false));
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center mt-4 lg:mt-0 self-center"
    >
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        {!shouldMount && (
          <div className="cursor-pointer" onClick={() => setShouldMount(true)}>
            <MagnifyingGlassIcon className="lg:w-7 lg:h-7 w-6 h-6 text-primary" />
          </div>
        )}
        {shouldMount && (
          <div className="flex w-full gap-2 items-center">
            <motion.input
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%", transitionDuration: 0.5 }}
              exit={{ opacity: 0, width: 0 }}
              transition={0.35}
              onFocus={() => setResult([])}
              type="search"
              id="search"
              name="search"
              className="block p-4  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none border-primary/20 focus:ring-primary/80 focus:border-primary/80 placeholder:text-primary/50"
              placeholder="Search Books, categories..."
              required
            />
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transitionDuration: 0.35 }}
              exit={{ opacity: 0, y: 15 }}
              disabled={searchLoading}
              type="submit"
              className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-redbg-red-800"
            >
              <lord-icon
                src="https://cdn.lordicon.com/osbjlbsb.json"
                trigger="boomerang"
                colors="outline:#121331,secondary:#242424,secondary2:#db3c26,quaternary:#eee"
                // style={{ width: "40px", height: "40px" }}
                stroke="95"
              ></lord-icon>
            </motion.button>
          </div>
        )}
        <AnimatePresence>
          {result.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-200/80 backdrop-blur-3xl rounded-lg absolute top-full w-full border  min-h-32 z-50"
            >
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
                onScroll={() => setResult([])}
              >
                {result?.map((book, i) => (
                  <li
                    key={i}
                    class="rounded px-4 py-2 sm:py-4 hover:bg-gray-100 cursor-pointer w-full"
                  >
                    <Link
                      onClick={() => {
                        setResult([]);
                        setShouldMount(false);
                      }}
                      to={`/category/${book.categoryId}`}
                      class="flex items-center space-x-4"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-8 h-8 rounded-full"
                          src={book.img}
                          alt="Neil image"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {book.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {book.category}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ${book.resalePrice}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default Search;
