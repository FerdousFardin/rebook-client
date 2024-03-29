import React from "react";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";

export default function Error() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <img
        src="https://images.unsplash.com/photo-1577542650426-9e8087274575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
        className="object-cover object-center w-full h-64"
      />

      <div className="flex items-center justify-center flex-1">
        <div className="max-w-xl px-4 py-8 mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We can't find that page.
          </h1>

          <p className="mt-4 text-gray-500">
            Try going back, or return home to start from the beginning.
          </p>

          <div className="w-full flex justify-center">
            <PrimaryBtn className="h-12 w-fit mt-5" to="/">
              Go Back Home
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
