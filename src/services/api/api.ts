import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(async (config) => {
  const cookieUser = getCookie("currentUser");
  const token = cookieUser ? JSON.parse(cookieUser).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((config) => {
  if (config.status === 401) {
    deleteCookie("currentUser");
  }
  return config;
});
