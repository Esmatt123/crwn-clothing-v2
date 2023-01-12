import { AuthenticationContainer } from "./authentication.styles.jsx";
import SignInForm from "../../sign-in-form/sign-in-form.component";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
import { auth } from "../../utils/firebase/firebase.utils";
//*This means that when the response mounts for the first time, the getRedirectResult will fetch data about the redirect
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
