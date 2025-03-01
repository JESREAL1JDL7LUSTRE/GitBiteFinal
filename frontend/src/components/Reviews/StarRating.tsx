
// sample only

import { Star } from "lucide-react";
import React from "react";

type StarRatingProps = {
  rating: number;
  onRate: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          size={20}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
