import { axiosInstance } from "../../plugins/axios-plugin";

export const UserService = {
  getCurrentUser: async () => {
    try {
      const res = await axiosInstance.get("user");
      return res.data.user;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  },

  updateUser: async (formData, fileName) => {
    try {
      let res = await axiosInstance.put("/user", formData);
      res.data.user.imageName = fileName;
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      console.error("Error registering user:");
      throw error;
    }
  },
};
