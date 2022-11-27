import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutElement from "./CheckoutElement";

export default function Checkout() {
  const [bookedPoduct] = useLoaderData();
  console.log(bookedPoduct);
  const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
  return (
    <section className="mt-10 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-thin tracking-wide text-gray-700 capitalize dark:text-white">
        Checkout for the{" "}
        <strong className="font-bold">{bookedPoduct.name}</strong>
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutElement {...{ bookedPoduct }} />
      </Elements>
    </section>
  );
}
