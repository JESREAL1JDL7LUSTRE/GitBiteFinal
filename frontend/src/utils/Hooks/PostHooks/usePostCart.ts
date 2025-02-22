import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";

const usePostCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const addToCart = async (dishId: number, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/cart/", { dish: dishId, quantity });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Failed to add to cart:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to add to cart.");
      } else {
        console.error("❌ Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
      alert("Error adding item to cart. Please log in.");
      nav("/signin");
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error };
};

export default usePostCart;
