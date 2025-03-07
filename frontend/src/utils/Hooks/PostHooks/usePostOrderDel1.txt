import { useState } from "react";
import api from "../../../api/api";

const useDeleteOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOrder = async (OrderId: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/order/${OrderId}/`);
    } catch (err) {
      console.error("Order deletion failed:", err);
      setError("Failed to delete Order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteOrder, loading, error };
};

export default useDeleteOrder;
