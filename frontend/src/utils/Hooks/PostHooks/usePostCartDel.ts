import { useState } from "react";
import api from "../../../api/api";

const useDeleteCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCart = async (cartId: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/cart/${cartId}/`);
    } catch (err) {
      console.error("Cart deletion failed:", err);
      setError("Failed to delete cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteCart, loading, error };
};

export default useDeleteCart;
