import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const getResponseState = (res) => {
  return res;
};

const getErrorState = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

axiosInstance.interceptors.response.use(
  (res) => getResponseState(res),
  (error) => getErrorState(error)
);

export default axiosInstance;
