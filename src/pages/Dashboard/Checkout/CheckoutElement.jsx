import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutElement({ bookedPoduct }) {
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const cardStyle = {
    style: {
      base: {
        iconColor: "#222",
        color: "#111",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",

        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#00000064",
        },
      },
      invalid: {
        iconColor: "#854d0e",
        color: "#854d0e",
      },
      complete: {
        iconColor: "#14632d",
        color: "#14632d",
      },
    },
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("rebookToken")}`,
      },
      body: JSON.stringify({ id: bookedPoduct._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
      });
  }, []);
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
      toast.error(`Payment for ${bookedPoduct.name} was unsuccessful!`);
      return;
    } else {
      setError(null);
      setSucceeded(true);

      fetch(`${import.meta.env.VITE_API_URL}/bookings?isPaid=true`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
        body: JSON.stringify({ id: bookedPoduct._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success(`Payment for ${bookedPoduct.name} was successful!`);
            setProcessing(false);
            navigate("/dashboard/my-orders");
          }
        })
        .finally(() => {
          setProcessing(false);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="username"
          >
            Name on Card
          </label>
          <input
            id="username"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>
        <div>
          <h2>Card Information</h2>
          <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring">
            <CardElement options={cardStyle} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="emailAddress"
          >
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="deliveryLocation"
          >
            Delivery Location
          </label>
          <input
            id="deliveryLocation"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>
      </div>

      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        type="submit"
        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary-100 cursor-not-allowed text-lg rounded-md disabled:bg-black/40 hover:bg-primary focus:outline-none focus:bg-gray-600"
      >
        <span id="button-text">
          {processing ? (
            <div>Wait</div>
          ) : succeeded ? (
            "Paid"
          ) : (
            `Pay now $${bookedPoduct.resalePrice}`
          )}
        </span>
      </button>
    </form>
  );
}
