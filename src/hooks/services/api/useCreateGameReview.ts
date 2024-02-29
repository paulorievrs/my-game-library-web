import { useUser } from "@/hooks/useUser";
import {
  GameReviewType,
  createGameReview
} from "@/services/api/game-review.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSuccess?: () => void;
};

export function useCreateGameReview({ onSuccess }: Props = {}) {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: async (data: GameReviewType) => {
      return createGameReview(data);
    },
    onSuccess: (response, payload) => {
      queryClient.setQueryData(["create-game-review"], payload);
      onSuccess?.();
    },
    mutationKey: ["create-game-review"],
    meta: {
      successMessage: "Your review was created!",
      errorMessages: {
        default: "An exceptional error occured."
      },
      redirectTo: `/profile/${user?.username}`
    }
  });
}
