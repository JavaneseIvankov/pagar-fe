"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  totalStars?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  interactive?: boolean;
  className?: string;
  starClassName?: string;
};

export default function StarRating({
  totalStars = 5,
  value = 0,
  onChange,
  size = 30,
  interactive = false,
  className,
  starClassName,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(value);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (val: number) => {
    if (!interactive) return;

    setRating(val);
    onChange?.(val);
  };

  const displayValue = hover || rating;

  return (
    <div className={cn("flex gap-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: stable index
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHover(starValue)}
            onMouseLeave={() => interactive && setHover(0)}
            disabled={!interactive}
            className={cn(
              "border-none bg-transparent p-0 transition-colors",
              interactive ? "cursor-pointer" : "cursor-default",
              starValue <= displayValue ? "text-yellow-400" : "text-gray-300",
              starClassName,
            )}
            style={{
              fontSize: size,
            }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
