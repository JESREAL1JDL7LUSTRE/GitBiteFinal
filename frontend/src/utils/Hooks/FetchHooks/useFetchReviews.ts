import { useState, useEffect } from "react";
import api from "../../../api/api"; // Ensure this is the correct path for your API

export interface ReviewsItem {
  id: number;
  dish: number;
  customer: number;
  customer_email: string;
  rating: number;
  review: string;
}

const useFetchReviews = (dish_id: number | null) => {
  const [reviews, setReviews] = useState<ReviewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dish_id) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await api.get<ReviewsItem[]>(`/api/reviews/dish/${dish_id}/`);
        setReviews(res.data);
      } catch {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [dish_id]); // Re-fetch when dish_id changes

  return { reviews, loading, error };
};

export default useFetchReviews;
