import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://realworld.habsidev.com/api",
  timeout: 10000,
  header: {
    "Content-Type": "application/json",
  },
});

let setLoadingCallback = null;

const setLoader = (callback) => {
  setLoadingCallback = callback;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (setLoadingCallback) {
      setLoadingCallback(true);
    }
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
      setLoadingCallback(true);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, setLoader };
