// Import Hooks
import { useContext, useEffect, useState } from "react";

// Import My Components
import INPUT_FIELDS from "../constans/constans";

// Import Css Module
import "../assets/styles/Pages.css";

// Import React Components
import { useNavigate } from "react-router-dom";
import {
  inputValidate,
  formValidate,
} from "../customhooks/useValitadeUserData";
import valitadeApi from "../customhooks/useValitadeApi";
import { UserService } from "../services/auth/UserService";
import { AuthContext } from "../contexts/AuthContext";

const EditUserData = () => {
  const [formValues, setFormValues] = useState({}); // Состояние для всех полей
  const [inputError, setInputError] = useState();
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();
  const { updateUser, fileName } = useContext(AuthContext);
  const [newFileName, setNewFileName] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await UserService.getCurrentUser();
        setFormValues({
          username: user.username || "",
          email: user.email || "",
        });
        setNewFileName(fileName);
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
    if (file) {
      setPhotoFile(file);
      setNewFileName(file.name);
    } else {
      setPhotoFile(null);
      setNewFileName(fileName);
    }
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
    try {
      const formData = new FormData();
      formData.append("username", formValues.username);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      if (photoFile) {
        base64Image = await fileToBase64(photoFile);
        formData.append("image", base64Image);
        await UserService.updateUser(formData, newFileName);
      } else {
        await UserService.updateUser(formData, newFileName);
      }
      updateUser(formValues, base64Image, newFileName);
      navigate("/articles/page1");
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
            <div className="form-input" style={{ padding: "8px 12px 8px 0" }}>
              <input
                type="file"
                id={field.name}
                style={{ display: "none" }}
                name={field.text}
                onChange={handleFileChange}
              />
              <label htmlFor={field.name} className="custom-file-label">
                Choose File
              </label>
              <span className="custom-file-text">
                {newFileName ? newFileName : fileName}
              </span>
            </div>
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
