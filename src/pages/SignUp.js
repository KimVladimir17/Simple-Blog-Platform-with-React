import { useState } from "react";

// Import My Components

import INPUT_FIELDS from "../service/db/db";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { NavLink, useNavigate } from "react-router-dom";
import { inputValidate, formValidate } from "../service/utils/valitadeUserData";
import valitadeApi from "../service/utils/valitadeApi";
import { AuthService } from "../service/api/AuthService";

const SignUp = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    inputValidate(event, formValues, setFormValues, inputError, setInputError);
  };

  const loginFormInput = INPUT_FIELDS.filter((field) => field.name !== "image");

  const createAccountHandler = async (e) => {
    e.preventDefault();
    const newErrors = formValidate(formValues);
    setInputError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      await AuthService.register(
        formValues.username,
        formValues.email,
        formValues.password
      );
      navigate("/sign-in");
    } catch (error) {
      valitadeApi(error, setInputError);
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) return <Loading />;
  return (
    <form className="form" onSubmit={createAccountHandler}>
      <h3 className="form-title">Create new account</h3>
      {loginFormInput.map((field) => (
        <div className="form-input-item" key={field.name}>
          <label htmlFor={field.name}>{field.text}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.text}
            className="form-input"
            placeholder={field.placeholder}
            value={formValues[field.name] || ""}
            onChange={handleInputChange}
          />
          {inputError[field.name] && (
            <p className="error-message">{inputError[field.name]}</p>
          )}
        </div>
      ))}
      <div className="form-input-processing">
        <input id="agree" required type="checkbox"></input>
        <label htmlFor="agree">
          I agree to the processing of my personal information
        </label>
      </div>
      <div className="form-btn">
        <button className="form-input-btn">Create</button>
        <div>
          <span>Already have an account? </span>
          <NavLink to="/sign-in" className="nav-link ">
            Sign In
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
