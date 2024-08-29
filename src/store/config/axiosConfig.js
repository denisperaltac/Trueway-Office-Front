import axios from "axios";
export let baseURL = "http://test.caffito.com.ar";
const axiosInstance = axios.create({
  baseURL: "http://test.caffito.com.ar",
  timeout: 20000,
});
export const setBearer = (Bearer) => {
  const headers = {
    Authorization: `Bearer ${Bearer}`,
  };

  axiosInstance.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  });
};

export default axiosInstance;
