import { AuthenticationContainer } from "./authentication.styles.jsx";
import SignInForm from "../../sign-in-form/sign-in-form.component";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const Authentication = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log(response);
  }, []);

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};
export default Authentication;
