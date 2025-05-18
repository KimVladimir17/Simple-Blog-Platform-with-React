import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://realworld.habsidev.com/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let setLoadingCallback = null;

const setLoader = (callback) => {
  setLoadingCallback = callback;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      if (user?.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
    }
    // if (setLoadingCallback) {
    //   setLoadingCallback(true);
    // }
    return config;
  },
  (error) => {
    if (setLoadingCallback) {
      setLoadingCallback(false);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (setLoadingCallback) {
      setLoadingCallback(false);
    }
    return response;
  },
  (error) => {
    if (setLoadingCallback) {
      setLoadingCallback(false);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, setLoader };
