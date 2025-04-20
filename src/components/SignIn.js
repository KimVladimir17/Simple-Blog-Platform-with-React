import { useState } from "react";
import INPUT_FIELDS from "../db/db";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="form">
      <h3 className="form-title">Sign In</h3>
      {INPUT_FIELDS.filter(
        (field) => field.name === "Email address" || field.name === "Password"
      ).map((field) => (
        <div className="form-input-item" key={field.name}>
          <label htmlFor={field.name}>{field.name}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            className="form-input"
            placeholder={field.placeholder}
            value={formValues[field.name] || ""}
            onChange={handleInputChange}
          />
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
