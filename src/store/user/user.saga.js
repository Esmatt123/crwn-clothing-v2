import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  SignUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    signOutFailed(error);
  }
}

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth, //*this creates the user document from the authenticated user
      userAuth, //* these are parameters, the user and the details
      additionalDetails
    );
    console.log(userSnapshot);
    console.log(userSnapshot.data());
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })); //*allows us to see the id along with therest of the data
  } catch (error) {
    yield put(signInFailed(error)); //* if failed return error
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error)); //* if failed return error
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup); //*this destructures the user but also allows us to sign in with google pop up
    yield call(getSnapshotFromUserAuth, user); //*this gives us a snapshot of the user
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser); //*this checks if the user has succesfully logged in
    if (!userAuth) return; //* If the user value is null, dont do anything

    yield call(getSnapshotFromUserAuth, userAuth); //* this creates the document reference off the current user
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(SignUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated); //*this removes all repetitive input
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
