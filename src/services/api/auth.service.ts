import { z } from "zod";
import { api } from "./api";
import { User } from "@/@types/user";

export const loginSchema = z.object({
  usernameOrEmail: z
    .string({
      required_error: "Username or e-mail is required."
    })
    .min(1, "Username or e-mail is required."),
  password: z
    .string({
      required_error: "Password is required."
    })
    .min(1, "Password is required.")
});

export type LoginType = z.infer<typeof loginSchema>;

type LoginRespose = {
  access_token: string;
} & User;

export const login = (data: LoginType) => {
  return api.post<LoginRespose>("/auth/login", data);
};

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required."
    })
    .min(1, "Username is required."),
  email: z
    .string({
      required_error: "E-mail is required."
    })
    .email("Invalid e-mail."),
  password: z
    .string({
      required_error: "Password is required."
    })
    .min(1, "Password is required."),
  bio: z
    .string({
      required_error: "Biography is required."
    })
    .min(1, "Biography is required.")
    .max(255, "Biography must have at most 255 characters.")
});

export type RegisterType = z.infer<typeof registerSchema>;

export const register = (data: RegisterType) => {
  return api.post<User>("/user", data);
};
