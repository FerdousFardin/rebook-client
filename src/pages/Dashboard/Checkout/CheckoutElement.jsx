import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutElement({ bookedPoduct }) {
  const [disabled, setDisabled] = useState(false);
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
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
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
    // setSucceeded(false)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      //
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
            alert("payment done");
            navigate("/dashboard/my-orders");
          }
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="username">
            Name on Card
          </label>
          <input
            id="username"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>
        <div>
          <h2>Card Information</h2>
          <div class="h-12 px-4 py-2">
            <CardElement options={cardStyle} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="emailAddress">
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label
            class="text-gray-700 dark:text-gray-200"
            for="deliveryLocation"
          >
            Delivery Location
          </label>
          <input
            id="deliveryLocation"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary/40 focus:ring-primary-100/50 focus:ring-opacity-40 dark:focus:border-primary focus:outline-none focus:ring"
          />
        </div>
      </div>

      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        type="submit"
        class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary-100 text-lg rounded-md disabled:bg-black/40 hover:bg-primary focus:outline-none focus:bg-gray-600"
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
