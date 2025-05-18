// Import Hooks
import { useContext, useState } from "react";

// Import My Components
import INPUT_FIELDS from "../constans/constans";

// Import React Components
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { inputValidate } from "../customhooks/useValitadeUserData";
import { AuthContext } from "../contexts/AuthContext";
import { AuthService } from "../services/auth/AuthService";

const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [inputError, setInputError] = useState({});
  const { setCurrentPage } = useOutletContext();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const loginFormInput = INPUT_FIELDS.filter(
    (field) => field.name === "email" || field.name === "password"
  );

  const handleInputChange = (event) => {
    inputValidate(event, setFormValues, inputError, setInputError);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const newErrors = {};
    loginFormInput.forEach((field) => {
      if (!formValues[field.name]) {
        newErrors[field.name] = `${field.text} is required`;
      }
    });

    setInputError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    try {
      const userData = await AuthService.login(
        formValues.email,
        formValues.password
      );
      login(userData);
      navigate("/articles/page1");
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      setFormValues("");
      setInputError({ ...setInputError, login: "Invalid credentials" });
    }
  };
  return (
    <form className="form" onSubmit={loginHandler}>
      <h3 className="form-title">Sign In</h3>
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
          <NavLink to="/articles/sign-up" className="nav-link ">
            Sign Up.
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
