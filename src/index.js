import { stripePromise } from "./utils/stripe/stripe.utils.js";
import { Elements } from "@stripe/react-stripe-js"; //*The Elements provider allows you to use Element components and access the Stripe object in any nested component.
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

//*PersistGate is an entry point to your react application which allows you to persist your store, the loading null means load nothing until the persist is done

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
