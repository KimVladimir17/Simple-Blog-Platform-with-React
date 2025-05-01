// Import Hooks
import { useContext, useEffect, useState } from "react";

// Import My Components
import INPUT_FIELDS from "../db/db";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { useNavigate } from "react-router-dom";
import { inputValidate, formValidate } from "../components/valitadeUserData";
import { api } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const EditUserData = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState();
  const navigate = useNavigate();

  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await api.getCurrentUser();
        setFormValues({
          username: user.username || "",
          email: user.email || "",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    inputValidate(event, formValues, setFormValues, inputError, setInputError);
  };

  const createAccountHandler = async (e) => {
    e.preventDefault();
    const newErrors = formValidate(formValues);
    setInputError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false; // Stop the process if errors exist
    }
    try {
      await api.updateUser({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        image: formValues.image,
      });
      updateUser(formValues);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
