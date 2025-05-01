import { useState } from "react";

// Import My Components
import INPUT_FIELDS from "../db/db";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { NavLink, useNavigate } from "react-router-dom";
import { inputValidate, formValidate } from "../components/valitadeUserData";
import { api } from "../api/api";

const SignUp = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    inputValidate(event, formValues, setFormValues, inputError, setInputError);
  };

  const createAccountHandler = async (e) => {
    e.preventDefault();
    const newErrors = formValidate(formValues); // Get errors from validateInput
    setInputError(newErrors); // Set errors to state

    if (Object.keys(newErrors).length > 0) {
      return; // Stop if errors exist
    }

    try {
      await api.register(
        formValues.username,
        formValues.email,
        formValues.password,
        formValues.image
      );
      navigate("/sign-in");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <form className="form" onSubmit={createAccountHandler}>
      <h3 className="form-title">Create new account</h3>
      {INPUT_FIELDS.map((field) => (
        <div className="form-input-item" key={field.name}>
          <label htmlFor={field.name}>{field.text}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.text} // Важно для связи с состоянием
            className="form-input"
            placeholder={field.placeholder}
            value={formValues[field.name] || ""} // Получаем значение из состояния
            onChange={handleInputChange} // Используем один обработчик для всех полей
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
