import React from "react";

export default function NoItems({ page, message }) {
  return (
    <div className="w-full mt-10 flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">
          OOPS!
        </p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">
          Nothing found on {page} page
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">
          {message}
        </p>
      </div>
    </div>
  );
}
