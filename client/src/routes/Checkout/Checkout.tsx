import React from "react";
import { Box } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE || "pk_test_bxJuE0fpBxauHmThIvNnWtDt");

export default function Checkout() {


  return (
    <Box
    sx={{
      display: "flex",
      direction: "row",
      justifyContent: "center",
      padding: 2,
      paddingBottom: 5
    }}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Box>
  )
}
