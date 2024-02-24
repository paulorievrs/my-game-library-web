"use client";

import Button from "@/components/Button/Button";
import GameReviews from "@/components/Profile/GameReviews/GameReviews";
import ProfileCard from "@/components/Profile/ProfileCard/ProfileCard";
import { useGetLastReviewsOfUser } from "@/hooks/services/api/useGetLastReviewsOfUser";
import { useUser } from "@/hooks/useUser";
import InAppLayout from "@/layouts/inapp-layout";
import { useSearchParams, useRouter } from "next/navigation";

export default function Profile({ params }: { params: { username: string } }) {
  const router = useRouter();
  const handleCreateReview = () => {
    router.push("/review/new");
  };
  const username = params?.username;
  const user = useUser();
  const isCurrentUser = user?.username === username;
  const searchParams = useSearchParams();
  const { data: gameReviewsData } = useGetLastReviewsOfUser({
    username,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: 6
  });
  const gameReviews = gameReviewsData?.data?.data ?? [];
  const gameReviewsCount = gameReviewsData?.data?.total ?? 0;

  return (
    <InAppLayout>
      <div className="grid grid-cols-1 gap-5">
        <ProfileCard username={username} gameReviewsCount={gameReviewsCount} />
        <div className="mt-10 flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Last reviews</h2>
          {isCurrentUser && (
            <Button
              variant="primary"
              label="New review"
              onClick={handleCreateReview}
            />
          )}
        </div>
        <GameReviews username={username} gameReviews={gameReviews} />
      </div>
    </InAppLayout>
  );
}
