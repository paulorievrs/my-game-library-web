import { Paginated } from "@/@types/api/requests";
import { GameReview } from "@/@types/game-review";
import { GetLastReviewsOfUserOptions } from "@/hooks/services/api/useGetLastReviewsOfUser";
import { api } from "./api";
import queryString from "query-string";
import { z } from "zod";
import { convertTimeToSeconds } from "@/utils/time";

export const getLastReviewsOfUser = (data: GetLastReviewsOfUserOptions) => {
  const stringified = queryString.stringify(data);
  return api.get<Paginated<GameReview>>(`/game-review?${stringified}`);
};

export const gameReviewSchema = z.object({
  review: z
    .string({
      required_error: "Review is required."
    })
    .min(1, "Review is required."),
  rating: z.number({
    invalid_type_error: "Rating has to be a number."
  }),
  beat: z.boolean({
    invalid_type_error: "Beat is required."
  }),
  gave_up: z.boolean({
    invalid_type_error: "Gave up is required."
  }),
  is_public: z.boolean({
    invalid_type_error: "Is public is required."
  }),

  game: z.object({
    id: z.number({
      required_error: "Game is required."
    }),
    name: z.string({
      required_error: "Game is required."
    })
  }),
  played_for_time: z
    .string({
      required_error: "Played for is required."
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Played for must contain only numbers."
    }),
  played_for_long: z.object(
    {
      id: z.number({
        required_error: "Played for is required."
      }),
      name: z.string({
        required_error: "Played for is required."
      })
    },
    {
      invalid_type_error: "Played for is required."
    }
  )
});

export type GameReviewType = z.infer<typeof gameReviewSchema>;

export const createGameReview = (data: GameReviewType) => {
  const playedForString =
    data.played_for_time + " " + data.played_for_long.name;
  const payload = {
    ...data,
    played_for: convertTimeToSeconds(playedForString)
  };
  return api.post<GameReviewType>("/game-review", payload);
};

export const getReview = (id: string) => {
  return api.get<GameReview>(`/game-review/${id}`);
};
