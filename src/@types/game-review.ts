import { Game } from "./game";
import { User } from "./user";

export type GameReview = {
  id: number;
  review: string;
  rating: number;
  beat: boolean;
  gave_up: boolean;
  is_public: boolean;
  review_at: string;
  played_for: number;
  game: Game;
  user: User;
};
