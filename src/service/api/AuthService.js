import { axiosInstance } from "./axios-plugin";

export const AuthService = {
  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        user: { email, password },
      });
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
      console.error("Error registering user:");
      throw error;
    }
  },
};
