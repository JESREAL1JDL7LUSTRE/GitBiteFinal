import { Star } from "lucide-react";
import React from "react";

type StarRatingShowProps = {
  rating: number; // Average rating (can be decimal)
};

const StarRatingShow: React.FC<StarRatingShowProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const full = star <= rating; // Full star
        const half = !full && star - 0.5 <= rating; // Half star

        return (
          <div key={star} className="relative w-5 h-5">
            {/* Full Star (Gray Background) */}
            <Star size={16} className="text-gray-300 absolute" />
            
            {/* Filled Star */}
            {full && <Star size={16} className="text-yellow-500 absolute" fill="currentColor" />}
            
            {/* Half Star (Uses Clipping) */}
            {half && (
              <div className="absolute overflow-hidden w-2.5">
                <Star size={16} className="text-yellow-500" fill="currentColor" />
              </div>
            )}
          </div>
        );
      })}
      <span className=" ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRatingShow;
