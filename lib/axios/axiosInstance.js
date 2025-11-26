import axios from "axios";
import store from "../redux/store/store";
import { setToken, logout } from "../redux/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: "https://nexlearn.noviindusdemosites.in/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = store.getState().auth.refreshToken;
        const response = await axios.post(
          "https://nexlearn.noviindusdemosites.in/api/auth/refresh-token",
          { refreshToken }
        );
        const { accessToken } = response.data;
        store.dispatch(setToken(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;