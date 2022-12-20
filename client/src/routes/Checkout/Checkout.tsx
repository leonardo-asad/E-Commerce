import React, { useState, useEffect } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../apis/stripe";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import CircularIndeterminate from "../../components/LoadingIcon/CircularIndeterminate";

import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE || "pk_test_bxJuE0fpBxauHmThIvNnWtDt");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function paymentIntent() {
      try {
        const data = await createPaymentIntent();
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
      {!clientSecret ?
      <CircularIndeterminate />
      :
      (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )
      }
    </div>
  )
}
