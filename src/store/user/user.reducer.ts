import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
  signOutFailed,
} from "./user.action";
import { AnyAction } from "redux";
import { UserState } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  console.log("dispatched");
  console.log(action);

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload, //* the current user will be set to whatever the payload is (user)
    };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;

  //switch (type) {
  //  case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //    return {
  //      ...state,
  //      currentUser: payload, //* the current user will be set to whatever the payload is (user)
  //    };
  //  case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //    return { ...state, currentUser: null };
  //  case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //  case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //  case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //    return { ...state, error: payload };
  //  default:
  //    return state;
  //}
};
