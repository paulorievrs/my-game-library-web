import { useState } from "react";
import { Star } from "../icons/Star";
type Props = {
  value: number;
  setValue: (value: number) => void;
};

export default function RatingSelector({ value, setValue }: Props) {
  if (value < 0 || value > 5) {
    value = 0;
  }

  const handleChangeValue = (i: number) => {
    if (value === i) {
      setValue(0);
      return;
    }
    setValue(i);
  };

  const [hoverValue, setHoverValue] = useState(-1);

  return (
    <div className="flex flex-row gap-1" onMouseLeave={() => setHoverValue(-1)}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          onClick={() => handleChangeValue(i + 1)}
          className="bg-primary cursor-pointer transition-all duration-300 ease-in-out"
          onMouseEnter={() => setHoverValue(i)}
        >
          <Star filled={i < value || hoverValue >= i} />
        </div>
      ))}
    </div>
  );
}
