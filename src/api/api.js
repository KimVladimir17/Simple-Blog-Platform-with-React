import { axiosInstance } from "./axios-plugin";

export const api = {
  getCurrentUser: async () => {
    try {
      const res = await axiosInstance.get("user");
      return res.data.user;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },

  updateUser: async (data) => {
    try {
      const res = await axiosInstance.put("/user", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        user: { email, password },
      }); //Save only after success
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      const res = await axiosInstance.post("/users", {
        user: { username, email, password },
      });
      return res.data.user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },
};
