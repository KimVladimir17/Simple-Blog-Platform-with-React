// Import Hooks
import { useState } from "react";

// Import My Components
import INPUT_FIELDS from "../db/db";

// Import React Components
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { loginProcess } from "../components/localSrtorage";

const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [inputError, setInputError] = useState({});

  const navigate = useNavigate();

  const { setLogged } = useOutletContext();

  const handleInputChange = (event) => {
    const { id, name, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
    let newErrors = { ...inputError };
    if (!value) {
      newErrors[id] = `${name} is required`;
    } else {
      delete newErrors[id]; // Удаляем ошибку, если поле заполнено
    }
    setInputError(newErrors);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formValues.email) {
      newErrors.email = "Email is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    setInputError(newErrors); // Set errors using the hook's function

    if (Object.keys(newErrors).length > 0) {
      console.log("Form has errors");
      return; // Stop the process if errors exist
    }
    loginProcess(formValues, setLogged, navigate, setFormValues, setInputError);
  };
  return (
    <form className="form" onSubmit={loginHandler}>
      <h3 className="form-title">Sign In</h3>
      {INPUT_FIELDS.filter(
        (field) => field.name === "email" || field.name === "password"
      ).map((field) => (
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
          {inputError && (
            <p className="error-message">{inputError[field.name]}</p>
          )}
        </div>
      ))}
      {inputError.login && <p className="error-message">{inputError.login}</p>}
      <div className="form-btn">
        <button className="form-input-btn">Login</button>
        <div>
          <span>Don’t have an account? </span>
          <NavLink to="/sign-up" className="nav-link ">
            Sign Up.
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
