import ShowReview from "@/components/Review/ShowReview";
import InAppLayout from "@/layouts/inapp-layout";
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
      <ShowReview gameReview={gameReviewData?.data} />
    </InAppLayout>
  );
}
