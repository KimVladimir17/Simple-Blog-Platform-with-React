import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setUserName(user.username);
      setUserImage(user.image);
      setFileName(user.imageName ? user.imageName : "No File Chosen");
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserName(userData.username);
    setUserImage(userData.image);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName(null);
    setUserImage(null);
  };

  const updateUser = (userData, newUserImage, newFileName) => {
    setUserName(userData.username);
    if (newUserImage) {
      setUserImage(newUserImage);
    }
    newFileName ? setFileName(newFileName) : setFileName("No File Chosen");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        userImage,
        fileName,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
