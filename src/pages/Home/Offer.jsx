import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import React from "react";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";

export default function Offer() {
  return (
    <div className="py-16">
      <div className="container m-auto space-y-8 px-6 text-gray-500 md:px-12 lg:px-20">
        <div className="justify-center gap-6 text-center md:flex md:text-left lg:items-center lg:gap-16">
          <div className="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
            <h1 className="text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
              Buy now and benefit up to{" "}
              <span className="text-primary dark:text-sky-300">50% off</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In nemo
              provident aliquid ipsam iure, itaque est fuga consequatur id
              velit!
            </p>
            <div className="flex flex-wrap gap-6">
              <PrimaryBtn className={"sm:w-max h-12 w-full"}>
                Shop Now <ShoppingCartIcon className="w-6 h-6" />
              </PrimaryBtn>
            </div>
          </div>
          <div className="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
            <div className="col-span-2 row-span-4">
              <img
                src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="rounded-full h-2/3"
                width="640"
                height="960"
                alt="shoes"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-2">
              <img
                src="https://images.unsplash.com/flagged/photo-1573993728701-146e1eafe184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="h-3/4 lg:w-3/4 rounded-xl object-cover object-top"
                width="640"
                height="640"
                alt="shoe"
                loading="lazy"
              />
            </div>
            <div className="col-span-3 row-span-3">
              <img
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                className="h-1/3 w-3/4 lg:w-1/3 rounded-xl object-cover object-center"
                width="640"
                height="427"
                alt="shoes"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
