import { PaginateQuery } from "@/@types/api/requests";
import { getLastReviewsOfUser } from "@/services/api/game-review.service";
import { useQuery } from "@tanstack/react-query";

export type GetLastReviewsOfUserOptions = {
  username: string;
} & PaginateQuery;

export function useGetLastReviewsOfUser(query: GetLastReviewsOfUserOptions) {
  return useQuery({
    queryFn: () => {
      return getLastReviewsOfUser(query);
    },
    queryKey: ["get-last-reviews-of-user", query],
    placeholderData: (previousData) => previousData,
    meta: {
      errorMessages: {
        default: `Error fetching ${query?.username ?? "user"} last reviews.`
      },
      skipLoading: true
    }
  });
}
