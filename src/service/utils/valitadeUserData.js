import INPUT_FIELDS from "../db/db";

const inputValidate = (
  event,
  formValues,
  setFormValues,
  inputError,
  setInputError
) => {
  const { id, name, value } = event.target;
  setFormValues((prev) => ({ ...prev, [id]: value }));

  let newErrors = { ...inputError };
  if (!value) {
    newErrors[id] = `${name} is required`;
  } else {
    delete newErrors[id];
  }
  setInputError(newErrors);
};

const formValidate = (formValues) => {
  const errors = {};
  INPUT_FIELDS.forEach((field) => {
    if (field.name !== "image") {
      if (!formValues[field.name]) {
        errors[field.name] = `${field.text} is required`;
      }
    } else {
      return;
    }
  });

  if (formValues.username) {
    if (formValues.username.length < 3) {
      errors.username = `Your User name needs to be at least 3 characters`;
    } else if (formValues.username.length > 20) {
      errors.username = `Your User name must be no more than 20 characters long.`;
    }
  }

  if (formValues.password) {
    if (formValues.password.length < 6) {
      errors.password = `Your password needs to be at least 6 characters`;
    } else if (formValues.password.length > 40) {
      errors.password = `Your password be no more than 40 characters`;
    }
  }

  if (formValues.repeatPassword) {
    if (formValues.password !== formValues.repeatPassword) {
      errors.repeatPassword = `Passwords must match`;
    }
  }

  return errors; // Return the object with errors
};

export { inputValidate, formValidate };
