// Import React
import React from "react";

// Import Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import CustomizedTable from "../../components/Table/Table";

// Import Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Import Style sheet
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
