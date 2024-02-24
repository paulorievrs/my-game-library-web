import { Paginated } from "@/@types/api/requests";
import { GameReview } from "@/@types/game-review";
import { GetLastReviewsOfUserOptions } from "@/hooks/services/api/useGetLastReviewsOfUser";
import { api } from "./api";
import queryString from "query-string";

export const getLastReviewsOfUser = (data: GetLastReviewsOfUserOptions) => {
  const stringified = queryString.stringify(data);
  return api.get<Paginated<GameReview>>(`/game-review?${stringified}`);
};
