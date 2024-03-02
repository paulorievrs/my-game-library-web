import { Star } from "../icons/Star";
type Props = {
  rating: number;
  unfilledColor?: string;
};

export default function Rating({ rating, unfilledColor }: Props) {
  if (rating < 0 || rating > 5) {
    rating = 0;
  }

  return (
    <div className="flex flex-row gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < rating} unfilledColor={unfilledColor} />
      ))}
    </div>
  );
}
