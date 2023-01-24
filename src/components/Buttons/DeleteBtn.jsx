import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import DeleteConfirm from "../../pages/Dashboard/DeleteConfirm/DeleteConfirm";

export default function DeleteBtn({ _id, name, refetch, fetchLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  function openModal(user) {
    setIsOpen(true);
    setUser(user);
  }
  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      setUser({});
    }, 200);
  }
  return (
    <>
      <button
        className="py-2 px-4 flex items-center gap-1 rounded-full border text-xs border-red-800 text-red-800 dark:bg-red-500 dark:hover:bg-red-600 duration-300 disabled:opacity-50 hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-0.5 hover:border-b active:border-b active:translate-y-0 active:shadow-[0px_1px_0px_0px_#231b15]"
        onClick={() => openModal({ _id, name })}
      >
        Delete <ExclamationCircleIcon className="w-4 h-4" />
      </button>
      <DeleteConfirm {...{ isOpen, closeModal, fetchLink, user, refetch }} />
    </>
  );
}
