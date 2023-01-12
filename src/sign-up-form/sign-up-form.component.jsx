import { SignUpStart } from "../store/user/user.action.js";
import { useDispatch } from "react-redux";
import Button from "../components/button/button.component.jsx";
import { SignUpContainer } from "./sign-up-form.styles.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  //*Empty input props for typing in the Sign Up form
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); //* The useState for being to set the default form fields on the virtual dom
  const { displayName, email, password, confirmPassword } = formFields; //* Destructuring the object properties from the default form fields
  const dispatch = useDispatch();
  const resetFormFields = () => {
    //* function to turn the form fields empty again by setting the form fields to empty
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    //*function that runs after the form has been submitted
    event.preventDefault();
    if (password !== confirmPassword) {
      //*alerts if the confirm password does not match the password
      alert("Passwords do not match!");
      return;
    }
    try {
      dispatch(SignUpStart(email, password, displayName));
      resetFormFields(); //* resets the form fields
    } catch (error) {
      //* catches errors
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    //* function for handling change on the onchange event in the input fields
    const { name, value } = event.target; //* destructures name and value so you dont have to write event.target.name

    setFormFields({ ...formFields, [name]: value }); //*sets what happens on the event.target on the form fields, the name determines which form field out of 4
  };

  return (
    //*returns html of the 4 form fields
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            required: true,
            value: displayName,
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            required: true,
            value: confirmPassword,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};
export default SignUpForm;
