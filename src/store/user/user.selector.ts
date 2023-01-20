import { RootState } from "../store";
import { UserState } from "./user.types";
import { createSelector } from "reselect";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
); //* this is the selector, it takes whatever is the argument and returns argument.user.currentUser
