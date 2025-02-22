import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface OrderResponse {
  id: number;
}

interface DishDetails {
  id: number;
  name: string;
  price: number;
}

const usePostOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const createOrderAndPay = async (dishDetails: DishDetails[], paymentMethod: string, totalPrice: number) => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Step 1: Create an order
      const orderResponse = await api.post<OrderResponse>("/api/order/", {
        dishes: dishDetails.map(dish => ({
          dish_id: dish.id,
          quantity: 1, // Default quantity, adjust as needed
        })),
      });

      if (!orderResponse.data || !orderResponse.data.id) {
        throw new Error("Failed to create order.");
      }

      const orderId = orderResponse.data.id;
      console.log("✅ Order created with ID:", orderId);

      // ✅ Step 2: Process the payment
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
      nav("/profile"); // Redirect user to profile if needed
    } finally {
      setLoading(false);
    }
  };

  return { createOrderAndPay, loading, error };
};

export default usePostOrder;
