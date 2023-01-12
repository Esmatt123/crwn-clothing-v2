require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({ //*creating payment intent with amount currency and payment type
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }), //*return a json string and a statuscode of 200 if successfull
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400, //* if failed return error
      body: JSON.stringify({ error }),
    };
  }
};
