import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";

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
        console.log("first");
        setResult(data);
      })
      .finally(() => setSearchLoading(false));
  };
  return (
    <>
      <label
        htmlFor="search"
        className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        {!shouldMount && (
          <div className="cursor-pointer" onClick={() => setShouldMount(true)}>
            <MagnifyingGlassIcon className="lg:w-5 lg:h-5 w-5 h-5 text-primary mr-3" />
          </div>
        )}

        <Transition appear show={shouldMount} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShouldMount(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-h-60">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-5"
                    >
                      Search Any Books or Categories
                    </Dialog.Title>
                    <form
                      onSubmit={handleSearch}
                      className="flex flex-col gap-3 items-center mt-4 lg:mt-0 h-2/3 min-h-h-52"
                    >
                      <div className="flex w-full gap-2 items-center">
                        <motion.input
                          autoComplete={"off"}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: 1,
                            width: "100%",
                            transitionDuration: 0.5,
                          }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={0.35}
                          onFocus={() => setResult([])}
                          type="search"
                          id="search"
                          name="search"
                          className="block relative p-2 pl-4 w-full text-sm text-gray-900 bg-white rounded-lg border outline-none border-primary/20 focus:ring-primary/80 focus:border-primary/80 placeholder:text-primary/50"
                          placeholder="Type Here..."
                          required
                        />
                        <motion.button
                          initial={{ opacity: 0, y: 15 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transitionDuration: 0.35,
                          }}
                          exit={{ opacity: 0, y: 15 }}
                          disabled={searchLoading}
                          type="submit"
                          className="text-xs bg-transparent rounded-full p-2 border-primary border focus:outline-none focus:border-primary-100 disabled:cursor-not-allowed duration-300 text-primary hover:shadow-[0px_2px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_1px_0px_0px_#231b15] "
                        >
                          Search
                        </motion.button>
                      </div>

                      <div className="mt-4 flex justify-center absolute top-0 right-5">
                        <button
                          onClick={() => setShouldMount(false)}
                          className="w-auto mx-auto sm:mx-0 text-xs font-medium flex items-center justify-center px-2 py-1 duration-300 text-black border border-black rounded-full hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_2px_0px_0px_#231b15]"
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </button>
                      </div>
                      {!!result.length ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-gray-200/80 backdrop-blur-3xl rounded-lg w-full border h-52 overflow-auto"
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
                      ) : (
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                          <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-wider text-gray-300"></p>
                          <p className="text-sm md:text-base lg:text-xl  tracking-wider text-gray-300 mt-2">
                            Start typing to find anything.
                          </p>
                        </div>
                      )}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default Search;
