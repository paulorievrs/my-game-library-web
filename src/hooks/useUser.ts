import { User } from "@/@types/user";
import { getCookie } from "cookies-next";

export function useUser(): User | null {
  const currentUser = getCookie("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}
