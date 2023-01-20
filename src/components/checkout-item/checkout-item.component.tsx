import { CartItemTypes } from "../../store/cart/cart.types";
import { FC } from "react";
import { selectCartItems } from "../../store/cart/cart.selector";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

type CheckoutItemProps = {
  cartItem: CartItemTypes;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem; //*destructuring of cartItems

  //const { clearItemFromCart, addItemToCart, removeItemFromCart } =
  //  useContext(CartContext);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems); //*redux version of cartItems context
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem)); //*function to add items quantity by dispatching the addItemToCart function
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem)); //*this is the same but for clearing items
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem)); //* this is the same but for subtracting the quantity
  };
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
