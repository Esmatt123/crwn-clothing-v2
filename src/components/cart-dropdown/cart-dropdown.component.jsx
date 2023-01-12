import { selectCartItems } from "../../store/cart/cart.selector";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { useSelector } from "react-redux";

const CartDropdown = () => {
  //const { cartItems } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate(); //* Returns an imperative method for changing the location. Used by s, but may also be used by other elements to change the location.

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
