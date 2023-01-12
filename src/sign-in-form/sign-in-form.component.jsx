import { googleSignInStart, emailSignInStart } from "../store/user/user.action";
import { useDispatch } from "react-redux";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../components/button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password or email!");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }

      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Welcome back!</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            required: true,
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            required: true,
            value: password,
          }}
        />
        <ButtonsContainer>
          <Button inputOptions={{ type: "submit" }}>Sign In</Button>
          <Button
            inputOptions={{
              type: "button",
            }}
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
