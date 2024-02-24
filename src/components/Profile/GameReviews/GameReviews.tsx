import { GameReview } from "@/@types/game-review";
import Button from "@/components/Button/Button";
import GameReviewCard from "@/components/GameReviewCard/GameReviewCard";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
  gameReviews: GameReview[];
};

export default function GameReviews({ username, gameReviews }: Props) {
  const user = useUser();
  const router = useRouter();
  if (!username) return null;
  if (gameReviews.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-5 gap-5">
        <h1 className="text-2xl font-bold text-white">No reviews yet</h1>
        {user?.username === username && (
          <Button
            variant="secondary"
            label="Add a review"
            onClick={() => router.push("/review/new")}
          />
        )}
      </div>
    );
  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
      {gameReviews?.map((gameReview) => (
        <GameReviewCard gameReview={gameReview} key={gameReview.id} />
      ))}
    </div>
  );
}
