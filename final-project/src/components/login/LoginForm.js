import React, { useEffect, useState } from "react";
import useForm from "../../app/useForm";
import { FormControl, TextField, Button } from "@mui/material";
import { useUserContext } from "../../context/userContext";

const genLogFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      errors: "",
      inputValidation: (email) =>
        email.includes("@gmail.com") ? null : "email is not valid",
    },
    password: {
      value: "",
      required: true,
      errors: "",
      inputValidation: (password) =>
        password.length > 6
          ? null
          : "Password should have at least 6 characters",
    },
  };
};

const LoginForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    formValues: loginFormValues,
    inputChangeHandler,
    checkButtonDisable,
  } = useForm({ defaultFormValues: genLogFormValues() });
  const { login } = useUserContext();

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(loginFormValues));
  }, [loginFormValues]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    login({ email, password });
  };

  console.log("form values", loginFormValues);
  return (
    <FormControl>
      <TextField
        variant="filled"
        name="email"
        label="Email"
        value={loginFormValues.email.value}
        error={!!loginFormValues.email.error}
        helperText={loginFormValues.email.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <TextField
        variant="filled"
        name="password"
        label="Password"
        type="password"
        value={loginFormValues.password.value}
        error={!!loginFormValues.password.error}
        helperText={loginFormValues.password.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <Button
        onClick={onFormSubmit}
        disabled={isButtonDisabled}
        variant="contained"
      >
        Login
      </Button>
    </FormControl>
  );
};

export default LoginForm;
