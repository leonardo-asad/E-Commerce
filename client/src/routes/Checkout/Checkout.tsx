import React from "react";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import CustomizedTable from "../../components/Table/Table";

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
      <Grid
      container
      direction={"column"}
      spacing={2}
      sx={{
        maxWidth:"700px"
      }}
      >
        <h1>Test Cards</h1>
        <CustomizedTable />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Grid>
    </Box>
  )
}
