import { createAction } from "../utils/reducer/reducer.utils";
import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //* function to add cart items to the cart drop down, the params are the cartitems array and whats to be added
  const existingCartItem = cartItems.find(
    //* this just checks to see if the cart items added matches whats already in the cart
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    //* this says if the cart item already exists, just increase the quantity
    return cartItems.map(
      (
        cartItem //*this loops over the cart to find cartitem with matching id
      ) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } //*if it does,return the cartitem with increased quantity
          : cartItem //* else do nothing
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]; //* return cartitems with the added product and/or increased quantity
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //* function to remove cart items to the cart drop down, the params are the cartitems array and whats to be removed

  const existingCartItem = cartItems.find(
    //*this loops over the cart to find cartitem with matching id
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    //* check if quantity is equal to 1, if it is remove that item from the cart
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id); //* returns a new cartitem array where the item to be removed is filtered away
  }

  return cartItems.map(
    (
      cartItem //* return back cartitems with matching cart item with reduced quantity
    ) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
  );
};

const clearCartItem = (
  cartItems,
  cartItemToClear //*filters out the cartitem entirely not just the quantity
) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  //* creates context which is basically state but for everything wrapped
  //*under this context. if a component is wrapped in this context, the state of all the properties shall apply
  isCartOpen: false,
  //setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
const CART_ACTION_TYPES = {
  //* the types for the redux library which labels what function to be dispatched
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  //* the initial state before theyre dispatched. needed for the reducer
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state, action) => {
  //*this is a reducer, every reducer has a state and action param. The state will be the INITIAL_STATE
  const { type, payload } = action; //*every action contains type and payload, this is a destructuring of that

  switch (
    type //*this is a switch/case function. The type will be the CART_ACTION_TYPES from above
  ) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state, //*Return initial states spread out
        ...payload, //*returns the payload, which is what will be set out of the state. example if the state is true, the payload can be settofalse
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state, //*returns the state. initial state is true
        isCartOpen: payload, //* sets the payload or future state, which is false
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`); //*returns error if theres a type that doesnt exist that gets invoked
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = //* destructures the initial states as well as the action(dispatch) from the usereducer function
    useReducer(cartReducer, INITIAL_STATE); //*the usereducer function has two params, the reducer and the initial state, is the equivalent of usestate

  const updateCartItemsReducer = (newCartItems) => {
    //* function to set the cart items, cart count and carttotal
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, //* the total quantity of items of the cart, is displayed in the carticon
      0
    );

    const newCartTotal = newCartItems.reduce(
      //* displays the total price at the end of the checkout, it does this by multiplying the total quantity with the price
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      //* sets all these items at once, it recieves the type, and then does the action based on that type
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        //* create action bundles the type and the payload
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (ProductToAdd) => {
    const newCartItems = addCartItem(cartItems, ProductToAdd); //* the addcartItem function from above, takes the cartitems array and the product to be added as arguments
    updateCartItemsReducer(newCartItems); //* this is equivalent of setState, but in reducer form, takes the newcartitems argument and dispatches it
  };
  const removeItemToCart = (cartItemToRemove) => {
    //* the addcartItem function from above, takes the product to be removed as arguments
    const newCartItems = removeCartItem(cartItems, cartItemToRemove); //* the removecartItem function from above, takes the cartitems array and the product to be added as arguments
    updateCartItemsReducer(newCartItems); //* this is equivalent of setState, but in reducer form, takes the newcartitems argument and dispatches it
  };

  const clearItemFromCart = (cartItemToCLear) => {
    //* the addcartItem function from above, takes the product to be cleared as arguments
    const newCartItems = clearCartItem(cartItems, cartItemToCLear); //* the clearcartItem function from above, takes the cartitems array and the product to be added as arguments
    updateCartItemsReducer(newCartItems); //* this is equivalent of setState, but in reducer form, takes the newcartitems argument and dispatches it
  };

  //const setIsCartOpen = (bool) => {
  //  dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  //};

  const value = {
    //*Here the values provided will be passed into the provider, thyre the same as in the create context object
    isCartOpen,
    //setIsCartOpen,
    cartItems,
    addItemToCart,
    clearItemFromCart,
    removeItemToCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; //*The provider now passes down everything within the context tree
};
