import { RootState } from "../store";
import { CartState } from "./cart.reducer";
import { createSelector } from "reselect";

const selectCartReducer = (state: RootState): CartState => state.cart; //* returns param.cart from store

export const selectCartItems = createSelector(
  //* returns param.cart.cartItems from selectCartReducer
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  //* returns param.cart.isCartOpen from selectCartReducer
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  //*returns param.cart.cartItems.reduce(...) which generates total cart quantity
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  //* does the same as above but for total price by multiplying total quantity * price
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
