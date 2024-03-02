import { getReview } from "@/services/api/game-review.service";
import { useQuery } from "@tanstack/react-query";

export function useGetGameReview(id: string) {
  return useQuery({
    queryFn: () => {
      return getReview(id);
    },
    queryKey: ["get-review", id],
    placeholderData: (previousData) => previousData,
    meta: {
      errorMessages: {
        default: `Error fetching reviews.`
      }
    }
  });
}
