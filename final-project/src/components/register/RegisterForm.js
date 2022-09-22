import React, { useEffect, useState } from "react";
import useForm from "../../app/useForm";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserContext } from "../../context/userContext";

const genRegFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      errors: "",
      inputValidation: (name) =>
        name.length > 3 ? null : "Name should have at least 1 character",
    },
    lastName: {
      value: "",
      required: true,
      errors: "",
      inputValidation: (lastName) =>
        lastName.length > 3
          ? null
          : "Last name should have at least 1 character",
    },
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

const RegisterForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { register } = useUserContext();
  const { formValues, checkButtonDisable, inputChangeHandler } = useForm({
    defaultFormValues: genRegFormValues(),
  });

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(formValues));
  }, [formValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    register({ firstName, lastName, email, password });
  };

  console.log("form values", formValues);
  return (
    <FormControl>
      <TextField
        variant="filled"
        name="firstName"
        label="Firstname"
        value={formValues.firstName.value}
        error={!!formValues.firstName.error}
        helperText={formValues.firstName.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <TextField
        variant="filled"
        name="lastName"
        label="Lastname"
        value={formValues.lastName.value}
        error={!!formValues.lastName.error}
        helperText={formValues.lastName.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <TextField
        variant="filled"
        name="email"
        label="Email"
        value={formValues.email.value}
        error={!!formValues.email.error}
        helperText={formValues.email.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <TextField
        variant="filled"
        name="password"
        label="Password"
        type="password"
        value={formValues.password.value}
        error={!!formValues.password.error}
        helperText={formValues.password.error}
        onChange={inputChangeHandler}
        margin="dense"
      />
      <Button
        onClick={onSubmit}
        disabled={isButtonDisabled}
        variant="contained"
      >
        Register
      </Button>
    </FormControl>
  );
};

export default RegisterForm;
