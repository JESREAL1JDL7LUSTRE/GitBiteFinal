// src/hooks/useFetchPayments.ts
import { useState, useEffect } from "react";
import api from "../../../api/api"; // Ensure this is the correct path for your API

export interface ReviewsItem {
    id: number;
    dish: string;
    customer_detail: [string, string];
    rating: number;
    review: string;
}

const useFetchreviews = () => {
  const [reviews, setreviews] = useState<ReviewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getreviews = async () => {
      setLoading(true);
      try {
        const res = await api.get<ReviewsItem[]>("/api/reviews/");
        setreviews(res.data);
      } catch (err) {
        setError("Failed to fetch reviews details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getreviews();
  }, []);

  return { reviews, loading, error };
};

export default useFetchreviews;
