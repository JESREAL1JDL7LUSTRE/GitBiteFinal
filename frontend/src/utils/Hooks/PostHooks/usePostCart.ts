import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";

interface CartItem {
  dish: {
    id: number;
    [key: string]: number;
  };
  quantity: number;
}

const usePostCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]); // Add cart state
  const nav = useNavigate();

  const addToCart = async (dishId: number, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/cart/", { dish: dishId, quantity });
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.dish.id === dishId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.dish.id === dishId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevCart, response.data];
      });
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

  const updateDishQuantity = async (dishId: number, quantityChange: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/api/cart/${dishId}/`, {
        quantityChange,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.dish.id === dishId ? { ...item, quantity: item.quantity + quantityChange } : item
        )
      );
      console.log("✅ Updated quantity:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Failed to update quantity:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to update quantity.");
      } else {
        console.error("❌ Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
      alert("Error updating quantity. Please log in.");
      //nav("/signin");
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, updateDishQuantity, cart, loading, error };
};

export default usePostCart;
