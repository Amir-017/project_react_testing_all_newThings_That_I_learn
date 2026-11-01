import axios from "axios";
import { queryClient } from "../Tank Stack/queryClient";
import { useAuthStore } from "../Store/tokenStore";

export const api = axios.create({ baseURL: "https://dummyjson.com" });


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
      queryClient.clear();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);