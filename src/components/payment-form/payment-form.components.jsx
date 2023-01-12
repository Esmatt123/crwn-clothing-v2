import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal); //*accessess the current state of the cartTotal with redux
  const currentUser = useSelector(selectCurrentUser); //*accessess the current state of the currentUser with redux
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); //* isProcessingPayment = false
  const paymentHandler = async (e) => {
    //* What happpens after payment button clicked
    e.preventDefault();
    if (!stripe || !elements) {
      return; //* If it doesnt contain stripe or elements, do nothing
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      //* fetches the payment intent, as a promise, sets method and content type, returns json string
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }), //* Stringify this json object, amount 10000
    }).then((res) => res.json()); //*After fetchiing the netlify folder return a json
    const {
      paymentIntent: { client_secret },
    } = response; //* destructuring the client secret property of the paymentIntent object
    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement), //*returns instance of cardElement which collects all necessary card details
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    }); //* the confirmcardpayment method is a method you invoke when submitting a payment, it confirms payment intent
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
