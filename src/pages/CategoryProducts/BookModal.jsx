import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function BookModal({
  isOpen,
  setIsOpen,
  Dialog,
  selectedProduct: { name, _id, category, location, resalePrice },
}) {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const { handleSubmit, register } = useForm();
  const handleBooking = (data, e) => {
    setUploading(true);
    const { mobile, location: userLocation } = data;
    const bookingInfo = {
      name,
      productId: _id,
      category,
      resalePrice,
      customerName: user?.displayName || "No Name",
      customerEmail: user?.email,
      mobile,
      location: userLocation || location,
    };
    fetch(`https://rebook-server.vercel.app/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(`${name} added to bookings`);
          setIsOpen(false);
          e.target.reset();
        }
      })
      .catch((er) => {
        toast.error(`${name} couldn't be added to bookings`);
        console.error(er);
      })
      .finally(() => {
        setUploading(false);
      });
  };
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
                <div className="max-w-2xl mx-auto bg-white p-16">
                  <form onSubmit={handleSubmit(handleBooking)}>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Full name
                        </label>
                        <input
                          {...register("customerName", { required: false })}
                          type="text"
                          id="name"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder={user?.displayName || "N/A"}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bookName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Book Name
                        </label>
                        <input
                          {...register("productName", { required: false })}
                          type="text"
                          id="bookName"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder={name}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mobile number
                        </label>
                        <input
                          {...register("mobile", { required: true })}
                          required
                          type="tel"
                          id="phone"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder="017123 456789"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Location
                        </label>
                        <input
                          {...register("location", {
                            required: true,
                          })}
                          required
                          type="text"
                          id="location"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder={location}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Price
                        </label>
                        <input
                          {...register("price", { required: false })}
                          type="text"
                          id="price"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder={`$${resalePrice}`}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Email address
                        </label>
                        <input
                          {...register("customerEmail", {
                            required: false,
                          })}
                          type="email"
                          id="email"
                          className="border bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-sm px-5 py-2.5  focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:placeholder:text-black"
                          placeholder={user?.email}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <button
                        disabled={uploading}
                        type="submit"
                        className="text-white bg-primary-100 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary
                        disabled:bg-primary/50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus-visible:ring-primary/10 focus-visible:ring-offset-2"
                      >
                        {uploading ? "Booking..." : "Book Now"}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-medium text-primary-100 hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
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
