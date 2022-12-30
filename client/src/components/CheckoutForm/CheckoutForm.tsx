import React, { useState, useEffect } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../apis/stripe';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Stack } from '@mui/material';

import CardSection from '../CardSection/CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements ? elements.getElement(CardElement) : null;
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

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    console.log(cardElement)

    if (!stripe || !elements || !cardElement) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log("Payment succeeded!")
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      >
        <CardSection />
        <PrimaryButton disabled={!stripe} text={"Confirm order"} />
      </Stack>
    </form>
  );
}
