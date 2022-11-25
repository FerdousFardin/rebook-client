import { Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function BookModal({ isOpen, setIsOpen, Dialog }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
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
              <Dialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add to your{" "}
                  <Link
                    className="text-primary-100 hover:underline"
                    to={"/dashboard/my-orders"}
                  >
                    Orders List
                  </Link>
                </Dialog.Title>

                {/* modal body start*/}
                <div class="max-w-2xl mx-auto bg-white p-16">
                  <form>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Full name
                        </label>
                        <input
                          type="text"
                          id="name"
                          class="text-white border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                          defaultValue={""}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="bookName"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Book Name
                        </label>
                        <input
                          type="text"
                          id="bookName"
                          class="text-white border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mobile number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          class="text-white border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                          placeholder="123-45-678"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="location"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          class="text-white border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                          defaultValue={""}
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        class="text-white border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>
                    <div className="flex gap-5">
                      <button
                        type="submit"
                        class="text-white bg-primary-100 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus-visible:ring-primary/10 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-medium text-primary-100 hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </form>
                </div>
                {/* modal body end*/}

                <div className="mt-4"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
