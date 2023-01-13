import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Checkout from "./routes/Checkout/checkout.component";
import Shop from "./routes/shop/shop.component";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/Authentication/authentication.component";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession()); //*will call checkusersession which creates user document reference
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
