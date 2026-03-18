import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

axiosInstance.defaults.headers = {
  Accept: `application/json`,
  "Content-Type": `application/json`,
};

const handleRequest = (config, token) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const getResponseState = (res) => {
  return res;
};

const getErrorState = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (res) => getResponseState(res),
  (error) => getErrorState(error)
);

export const registerRequestIntercept = (accessToken) => {
  axiosInstance.interceptors.request.use((config) =>
    handleRequest(config, accessToken)
  );
};

export default axiosInstance;
