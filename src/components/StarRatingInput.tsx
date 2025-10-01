"use client";
import React, { useState } from "react";
import Image from "next/image";

import starOn from "@/assets/icon/icon_star_on.svg";
import starOff from "@/assets/icon/icon_star_off.svg";

interface StarRatingInputProps {
  initialRating: number;
  maxStars?: number;
  onChange: (rating: number) => void;
}

const StarIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? starOn : starOff}
    alt="별 아이콘"
    width={24}
    height={24}
    className="transition-colors duration-150"
  />
);

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  initialRating,
  maxStars = 5,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleClick = (rating: number) => {
    setCurrentRating(rating);
    onChange(rating);
  };

  return (
    <div
      className="flex justify-center space-x-1"
      onMouseLeave={() => setHoverRating(0)}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const ratingValue = index + 1;
        const isActive = ratingValue <= (hoverRating || currentRating);
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            aria-label={`별점 ${ratingValue}`}
          >
            <StarIcon isActive={isActive} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
