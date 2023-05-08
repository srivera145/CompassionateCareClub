import {
  CardElement,
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

function PaymentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement("card"),
        type: "card",
      });
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          paymentMethod: paymentMethod.paymentMethod.id,
        }),
      });
      if (!response.ok) return alert("Payment unsuccessful!");
      const data = await response.json();
      const confirm = await stripe.confirmCardPayment(data.clientSecret);
      if (confirm.error) return alert("Payment unsuccessful!");
      alert("Payment Successful! Subscription active.");
    } catch (err) {
      console.error(err);
      alert("Payment failed! " + err.message);
    }
  };

  return (
    <div id="form">
      <div id="name">
        Name:{" "}
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <div id="email">
        Email:{" "}
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div id="cc">
        <CardElement id="cc-input" />
      </div>
      <br />
      <button id="pay" onClick={createSubscription}>
        Subscribe - $25 USD
      </button>
    </div>
  );
}

export default PaymentForm;
