import { useState } from "react";
import api from "../../../api/api";

interface ReviewData {
  dish: number; // Corrected field (previously was "order")
  rating: number;
  review: string;
}

const usePostReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postReview = async (reviewData: ReviewData) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/reviews/", reviewData); // Make sure this endpoint exists
    } catch (err) {
      console.error("Review failed:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error };
};

export default usePostReview;
