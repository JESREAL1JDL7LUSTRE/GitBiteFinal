import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface OrderResponse {
  id: number;
  total_price: number;
}

interface DishDetails {
  id: number;
  name: string;
  price: number;
}

const usePostOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ Step 1: Create Order
  const createOrder = async (dishDetails: DishDetails[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<OrderResponse>("/api/order/", {
        dishes: dishDetails.map(dish => ({
          dish_id: dish.id,
          quantity: 1, // Default to 1, adjust if needed
        })),
      });

      if (!response.data || !response.data.id) {
        throw new Error("Order creation failed.");
      }
      return response.data; // Return order object
    } catch (err) {
      console.error("❌ Order Error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Process Payment
  const processPayment = async (orderId: number, paymentMethod: string, totalPrice: number) => {
    setLoading(true);
    try {
      await api.post("/api/payment/", {
        order: orderId,
        payment_method: paymentMethod,
        amount: totalPrice,
      });

      alert("🎉 Payment successful!");
    } catch (err) {
      console.error("❌ Payment Error:", err);
      setError("Payment failed. Please try again.");
      alert("Payment failed. Please log in to continue.");
      navigate("/profile"); // Redirect if necessary
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, processPayment, loading, error };
};

export default usePostOrder;
