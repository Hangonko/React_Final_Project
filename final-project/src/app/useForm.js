import React, { useEffect, useState } from "react";

const useForm = ({ defaultFormValues }) => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const inputChangeHandler = (e) => {
    const { inputValidation } = formValues[e.target.name];
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          value: e.target.value,
          error: inputValidation ? inputValidation(e.target.value) : "",
        },
      };
    });
  };

  const checkButtonDisable = (values) => {
    for (const [key, objVal] of Object.entries(values)) {
      if (objVal.required && (objVal.error || !objVal.value)) {
        return true;
      }
    }
  };

  const clearForm = (obj) => {
    setFormValues(obj);
  };
  return {
    formValues,
    setFormValues,
    inputChangeHandler,
    clearForm,
    checkButtonDisable,
  };
};

export default useForm;
