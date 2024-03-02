import { authOptions } from "@/app/api/auth/config";
import axios, { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(async (config) => {
  //TODO: Fix to get session from server, for now SSRs are not working, will return 401
  if (typeof window === "undefined") {
    return config;
  }

  const session = await getSession();
  const token = session?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((config) => {
  if (config.status === HttpStatusCode.Unauthorized) {
    signOut();
  }
  return config;
});
