"use client";

import InAppLayout from "@/layouts/inapp-layout";

export default function SingleReview({
  params
}: {
  params: { reviewId: string };
}) {
  const reviewId = params?.reviewId;
  return <InAppLayout>{reviewId}</InAppLayout>;
}
