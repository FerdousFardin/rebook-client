import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";

export default function Banner() {
  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Knowledge is
            <strong className="block font-extrabold text-primary">
              Strength.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-gray-600">
            Buy and sell your used books at the best price
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <PrimaryBtn to={`/categories`}>Explore Now</PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
