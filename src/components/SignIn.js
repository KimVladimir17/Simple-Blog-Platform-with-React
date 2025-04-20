import { useState } from "react";
import INPUT_FIELDS from "../db/db";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";

const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [inputError, setInputError] = useState();
  const navigate = useNavigate();

  const { logging } = useOutletContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    let newErrors = { ...inputError };
    if (!value) {
      newErrors[name] = `${name} is required`;
    } else {
      delete newErrors[name]; // Удаляем ошибку, если поле заполнено
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

    const storedUserString = localStorage.getItem("user");
    const storedUser = JSON.parse(storedUserString);

    if (
      storedUser &&
      storedUser.email === formValues.email &&
      storedUser.password === formValues.password
    ) {
      console.log("Login successful!", storedUser);
      logging(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
      setInputError({ ...inputError, login: "Invalid credentials" }); // Adding login error
    }
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
            name={field.name}
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
