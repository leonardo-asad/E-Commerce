// Import React Library
import React, { useState, useEffect } from 'react';

// Stripe Imports
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

// Import API functions
import { createPaymentIntent } from '../../apis/stripe';

// Import Components
import ButtonLoading from '../Buttons/LoadingButton';
import Stack from '@mui/material/Stack';
import CustomAlert from '../Messages/CustomAlert';
import CardSection from '../CardSection/CardSection';

// Redux Imports
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { checkoutCart } from '../../store/cartSlice/cartSlice';

// React Router Imports
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cardElement = elements ? elements.getElement(CardElement) : null;

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

    if (!stripe || !elements || !cardElement) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setSuccessMessage(undefined);
    setError(undefined);

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
        console.log("Payment succeeded!")
        setSuccessMessage("Payment succeeded!");
        // Dispatch Checkout action
        dispatch(checkoutCart());
        // Return to Home Page and deliver Success message
        return navigate('/', {
          state: {
            message: 'Payment succeeded!'
          }
        });
      }
    }
    setIsLoading(false);
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
          <ButtonLoading disabled={!stripe} text={"Confirm order"} isLoading={isLoading} />
        </Stack>
      </form>
      { successMessage && <CustomAlert severity='success'>{successMessage}</CustomAlert> }
      { error && <CustomAlert severity='error'>{error}</CustomAlert> }
    </>
  );
}
