import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/Loader/Loader";

function MyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    data: userInfo,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const { handleSubmit, register } = useForm();
  const handleUpdateProfile = (data, e) => {
    setLoading(true);
    const { image, ...rest } = data;
    const formData = new FormData();
    formData.append("image", image[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbb_apikey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((dataImg) => {
        if (dataImg.data.url) {
          const updatedInfo = {
            ...rest,
            photoURL: dataImg.data.url,
          };
          fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: "PUT",
            headers: {
              authorization: `bearer ${localStorage.getItem("rebookToken")}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedInfo),
          })
            .then((res) => res.json())
            .then((dataUp) => {
              if (dataUp.modifiedCount) {
                toast.success("Your profile updated.");
              }
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading) return <Loader />;
  if (error) navigate("/error");
  return (
    <div className="lg:w-2/3">
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="bg-gray-200 shadow rounded py-12 lg:px-28 px-8"
      >
        <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
          Edit your info
        </p>
        <div className="md:flex items-center mt-12">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              arial-label="Please input name"
              type="name"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-primary mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-500"
              placeholder="Please input name"
              defaultValue={userInfo.name}
            />
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Email Address
            </label>
            <input
              {...register("email")}
              arial-label="Please input email address"
              type="name"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-primary mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-500"
              placeholder="Please input email address"
              defaultValue={userInfo.email}
            />
          </div>
        </div>
        <label className="inline-block my-5 text-gray-500">
          <strong className="text-gray-900">Update Profile Picture</strong>
        </label>
        <div className="w-full">
          <label className="flex flex-col w-full h-32 border-2 hover:border-dotted rounded-lg bg-slate-50 hover:bg-gray-100 hover:border-gray-300">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                Select a photo
              </p>
            </div>
            <input type="file" className="opacity-0" {...register("image")} />
          </label>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-primary-100 rounded hover:bg-primary focus:ring-2 focus:ring-offset-2 disabled:bg-primary/40 disabled:cursor-not-allowed focus:ring-primary focus:outline-none"
          >
            {loading && (
              <svg
                role="status"
                className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#db3c26"
                />
              </svg>
            )}
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyProfile;
