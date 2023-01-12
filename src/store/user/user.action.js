import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (
  user //*this is a compartmentalised action, it simply dispatches the current user with type and payload like a setState
) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*  
  GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "user/SIGN_IN_FAILURE", 
*/

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION); //*invokes the checkusersession reducer

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START); //* invokes the googlesignin reducer

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }); //*invokes the emailsignin reducer

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user); //*This shows the sign in was a success and sets currentUser to user

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error); //*This shows the sign in was a failure and returns error

export const SignUpStart = (email, password, displayName) => {
  console.log(USER_ACTION_TYPES.SIGN_UP_START);
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });
};

export const signUpSuccess = (user, additionalDetails) => {
  console.log(USER_ACTION_TYPES.SIGN_UP_SUCCESS);
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails,
  });
};

export const SignUpFailed = (error) => {
  console.log(USER_ACTION_TYPES.SIGN_UP_FAILED);
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
};

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
