import { LoginType, login } from "@/services/api/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

type Props = {
  onSuccess?: () => void;
};

export function useLogin({ onSuccess }: Props = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginType) => {
      return login(data);
    },
    mutationKey: ["login"],
    onSuccess: (response, payload) => {
      queryClient.setQueryData(["login"], payload);
      const { access_token, ...user } = response.data;
      setCookie(
        "currentUser",
        JSON.stringify({
          token: access_token,
          ...user
        })
      );

      onSuccess?.();
    },
    meta: {
      successMessage: "Welcome!",
      errorMessages: {
        401: "Incorrect credentials."
      },
      redirectTo: "/home"
    }
  });
}
