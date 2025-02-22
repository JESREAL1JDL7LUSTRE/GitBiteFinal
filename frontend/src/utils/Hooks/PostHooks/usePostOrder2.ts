import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface Order {
  id: number;
  total_price: number;
}

const usePostOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const createOrder = async (dishDetails: { id: number }[]) => {
    setLoading(true);
    setError(null);

    try {
      const dishesToOrder = dishDetails.map(dish => ({ dish_id: dish.id }));

      const res = await api.post("/api/order/", { dishes: dishesToOrder });

      setOrder({ id: res.data.id, total_price: res.data.total_price });
      return res.data; // Return order data for further use
    } catch (error) {
      console.error("❌ Failed to create order:", error);
      setError("Error creating order. Please try logging in.");
      alert("Error adding items to Order. Please log in.");
      nav("/signin");
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, order, loading, error };
};

export default usePostOrder;
