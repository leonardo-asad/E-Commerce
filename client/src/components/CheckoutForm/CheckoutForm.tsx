import React, { useState, useEffect } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../apis/stripe';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Stack } from '@mui/material';
import Success from '../Messages/Success';
import Error from '../Messages/Error';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { checkoutCart } from '../../store/cartSlice/cartSlice';

import CardSection from '../CardSection/CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements ? elements.getElement(CardElement) : null;
  const [clientSecret, setClientSecret] = useState("");
  const [successMessage, setSuccessMessage] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const dispatch = useDispatch<AppDispatch>();

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
      setError(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log("Payment succeeded!")
        setSuccessMessage("Payment succeeded!");
        dispatch(checkoutCart());
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack
        direction={"column"}
        justifyContent="center"
        alignItems={"center"}
        sx={{ width: '100%' }}
        >
          <CardSection />
          <PrimaryButton disabled={!stripe} text={"Confirm order"} />
        </Stack>
      </form>
      { successMessage && <Success text={successMessage} /> }
      { error && <Error text={error} /> }
    </>

  );
}
