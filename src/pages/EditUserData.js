// Import Hooks
import { useContext, useEffect, useState } from "react";

// Import My Components
import INPUT_FIELDS from "../service/db/db";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { useNavigate } from "react-router-dom";
import { inputValidate, formValidate } from "../service/utils/valitadeUserData";
import valitadeApi from "../service/utils/valitadeApi";
import { UserService } from "../service/api/UserService";
import { AuthContext } from "../contexts/AuthContext";

const EditUserData = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState();
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await UserService.getCurrentUser();
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
    inputValidate(event, setFormValues, inputError, setInputError);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    file ? setPhotoFile(file) : setPhotoFile(null);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const createAccountHandler = async (e) => {
    e.preventDefault();
    const newErrors = formValidate(formValues);
    setInputError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    let base64Image;
    if (photoFile) {
      base64Image = await fileToBase64(photoFile);
    }
    try {
      await UserService.updateUser({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        image: base64Image || photoFile,
      });
      updateUser(formValues, base64Image || null);
      navigate("/");
    } catch (error) {
      valitadeApi(error, setInputError);
    }
  };

  return (
    <form className="form" onSubmit={createAccountHandler}>
      <h3 className="form-title">Edit Profile</h3>
      {INPUT_FIELDS.map((field) => (
        <div className="form-input-item" key={field.name}>
          <label htmlFor={field.name}>{field.text}</label>
          {field.type === "file" ? (
            <input
              type="file"
              id={field.name}
              name={field.text}
              className="form-input"
              onChange={handleFileChange}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.text}
              className="form-input"
              placeholder={field.placeholder}
              value={formValues[field.name] || ""}
              onChange={handleInputChange}
            />
          )}
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
