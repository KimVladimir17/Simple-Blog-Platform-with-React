import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setIsAuthenticated(true);
      setUserName(user ? user.username : null);
      setUserImage(user ? user.image : null);
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

  const updateUser = (userData) => {
    setUserName(userData.username);
    setUserImage(userData.image);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        userImage,
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
