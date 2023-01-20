import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteConfirm({
  isOpen,
  closeModal,
  user,
  refetch,
  fetchLink,
}) {
  const [loading, setLoading] = useState(false);
  const handleDelete = (id) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/${fetchLink}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${user.name} has been deleted`);
          refetch();
        } else toast.error(`Deletion failed`);
      })
      .finally(() => {
        closeModal();
        setLoading(false);
      });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Do you really want to delete <strong>{user.name}</strong>?
                    This process cannot be undone
                  </p>
                </div>

                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    disabled={loading}
                    onClick={closeModal}
                    className="mb-2 md:mb-0 bg-white disabled:bg-gray-400 disabled:cursor-not-allowed px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(user._id)}
                    className="mb-2 md:mb-0 bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
