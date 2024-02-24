import {
  LoginType,
  RegisterType,
  login,
  register
} from "@/services/api/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

type Props = {
  onSuccess?: () => void;
};

export function useRegister({ onSuccess }: Props = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterType) => {
      return register(data);
    },
    onSuccess: (response, payload) => {
      queryClient.setQueryData(["register"], payload);
      onSuccess?.();
    },
    mutationKey: ["register"],
    meta: {
      successMessage: "You can now login, welcome!",
      errorMessages: {
        default: "An exceptional error occured."
      },
      redirectTo: "/"
    }
  });
}
