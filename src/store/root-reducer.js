import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  //*This is the root reducer, takes all your combined reducers, and returns a single reducer you can use across multiple places instead of context
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
