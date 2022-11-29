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
        className="text-white py-1 px-2  rounded bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:opacity-50"
        onClick={() => openModal({ _id, name })}
      >
        Delete
      </button>
      <DeleteConfirm {...{ isOpen, closeModal, fetchLink, user, refetch }} />
    </>
  );
}
