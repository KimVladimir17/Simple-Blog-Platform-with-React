import { axiosInstance } from "./axios-plugin";

export const UserService = {
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
      const res = await axiosInstance.put("/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      console.error("Error registering user:");
      throw error;
    }
  },
};
