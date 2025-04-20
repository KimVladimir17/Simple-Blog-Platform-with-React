import { useState } from "react";
import INPUT_FIELDS from "../db/db";
import "./Sign.css";
import { NavLink } from "react-router-dom";
const SignUp = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value }); // Обновляем состояние конкретного поля
  };
  return (
    <form className="form">
      <h3 className="form-title">Create new account</h3>
      {INPUT_FIELDS.map((field) => (
        <div className="form-input-item" key={field.name}>
          <label htmlFor={field.name}>{field.name}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name} // Важно для связи с состоянием
            className="form-input"
            placeholder={field.placeholder}
            value={formValues[field.name] || ""} // Получаем значение из состояния
            onChange={handleInputChange} // Используем один обработчик для всех полей
          />
        </div>
      ))}
      <div className="form-input-processing">
        <input type="checkbox"></input>
        <p>I agree to the processing of my personal information</p>
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
