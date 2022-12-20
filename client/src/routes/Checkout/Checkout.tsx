import React, { useState, useEffect } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../apis/stripe";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

import './Checkout.css';

const stripePromise = loadStripe("pk_test_bxJuE0fpBxauHmThIvNnWtDt");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function paymentIntent() {
      try {
        const data = await createPaymentIntent(200);
        setClientSecret(data.clientSecret)
      } catch (err) {
        throw err;
      }
    }

    paymentIntent();
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="form-body">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
