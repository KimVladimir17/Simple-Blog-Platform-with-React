import { useState } from "react";
import INPUT_FIELDS from "../db/db";
import "./Sign.css";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";

const EditUserData = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState();
  const navigate = useNavigate();

  const { logging } = useOutletContext();

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

    if (!newErrors.password) {
      if (formValues.password.length < 6)
        newErrors.password = `Your password needs to be at least 6 characters`;
    }
    if (!newErrors.repeatPassword) {
      if (formValues.password !== formValues.repeatPassword) {
        newErrors.repeatPassword = `Passwords must match`;
      }
    }
    setInputError(newErrors);

    const storedUserString = localStorage.getItem("user");
    const storedUser = JSON.parse(storedUserString);

    if (
      storedUser &&
      storedUser.email === formValues.email &&
      storedUser.password === formValues.password
    ) {
      alert("you are already logged in");
      return false;
    }
    return Object.keys(newErrors).length === 0;
  };

  const createAccountHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("user", JSON.stringify(formValues));
      logging(true);
      navigate("/");
    }

    return;
  };
  return (
    <form className="form" onSubmit={createAccountHandler}>
      <h3 className="form-title">Edit Profile</h3>
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

      <div className="form-btn">
        <button className="form-input-btn">Save</button>
      </div>
    </form>
  );
};

export default EditUserData;
