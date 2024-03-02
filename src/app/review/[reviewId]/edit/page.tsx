import { useGetGameReview } from "@/hooks/services/api/useGetGameReview";
import InAppLayout from "@/layouts/inapp-layout";
import ReviewForm from "@/components/Review/ReviewForm/ReviewForm";
import { getReview } from "@/services/api/game-review.service";

export default async function SingleReview({
  params
}: {
  params: { reviewId: string };
}) {
  const reviewId = params?.reviewId;
  const gameReviewData = await getReview(reviewId);

  return (
    <InAppLayout>
      <div className="my-16">
        <ReviewForm gameReview={gameReviewData?.data} />
      </div>
    </InAppLayout>
  );
}
