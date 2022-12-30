/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import './CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <>
      <h1>Test the integration</h1>
      <h2>Test Cards</h2>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4242 4242 4242 4242</td>
            <td>Succeeds and immediately processes the payment.</td>
          </tr>
          <tr>
            <td>4000 0000 0000 9995</td>
            <td>Always fails with a decline code of insufficient_funds.</td>
          </tr>
          <tr>
            <td>4000 0025 0000 3155</td>
            <td>Requires authentication.</td>
          </tr>
        </tbody>
      </table>
      <label>
        <h2>Card details</h2>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </>

  );
};

export default CardSection;
