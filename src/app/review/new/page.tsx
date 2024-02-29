import ReviewForm from "@/components/Review/ReviewForm/ReviewForm";
import InAppLayout from "@/layouts/inapp-layout";

export default function NewReview() {
  return (
    <InAppLayout>
      <div className="my-16">
        <ReviewForm />
      </div>
    </InAppLayout>
  );
}
