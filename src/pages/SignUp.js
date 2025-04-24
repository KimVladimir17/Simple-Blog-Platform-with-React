import { useState } from "react";

// Import My Components
import INPUT_FIELDS from "../db/db";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { signUpCheck } from "../components/localSrtorage";

const SignUp = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState();
  const navigate = useNavigate();

  const { setUserName } = useOutletContext();

  const handleInputChange = (event) => {
    const { id, value, name } = event.target;

    setFormValues({ ...formValues, [id]: value }); // Обновляем состояние конкретного поля
    let newErrors = { ...inputError };
    if (!value) {
      newErrors[id] = `${name} is required`;
    } else {
      delete newErrors[id]; // Удаляем ошибку, если поле заполнено
    }
    setInputError(newErrors);
  };

  const validateForm = () => {
    let newErrors = {};
    INPUT_FIELDS.forEach((field) => {
      if (!formValues[field.name]) {
        newErrors[field.name] = `${field.text} is required`;
      }
    });

    if (!newErrors.username) {
      if (formValues.username.length < 3)
        newErrors.username = `Your User name needs to be at least 3 characters`;
      if (formValues.username.length > 20) {
        newErrors.username = `Your User name must be no more than 20 characters long.
`;
      }
    }

    if (!newErrors.password) {
      if (formValues.password.length < 6)
        newErrors.password = `Your password needs to be at least 6 characters`;

      if (formValues.password.length > 40)
        newErrors.password = `Your password be no more than 40 characters`;
    }
    if (!newErrors.repeatPassword) {
      if (formValues.password !== formValues.repeatPassword) {
        newErrors.repeatPassword = `Passwords must match`;
      }
    }

    setInputError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Form has errors");
      return false; // Stop the process if errors exist
    }

    const isEmailRegistered = signUpCheck(
      formValues,
      setFormValues,
      setInputError
    );

    if (isEmailRegistered) {
      return false;
    }
    return true;
  };

  const createAccountHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUserName(formValues.username);
      localStorage.setItem("user", JSON.stringify(formValues));
      navigate("/sign-in");
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
          {inputError && (
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
