import axios from "axios";
import { BaseUrl } from "./config";
import { store } from "../store";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and user data on unauthorized
      store.dispatch({ type: "auth/clearToken" });
      store.dispatch({ type: "user/logOut" });
      // Redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
