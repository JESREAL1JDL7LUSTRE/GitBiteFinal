import { useState, useEffect } from "react";
import api from "../../../api/api"; // Ensure this is the correct path for your API

export interface Dish {
  id: number;
  name: string;
  description: string;
  recipes: number;
  category: string;
  available: boolean;
  image?: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  dish: Dish;
}

const useFetchCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/cart/");
    
        if (!Array.isArray(res.data)) {
          throw new Error("Invalid cart data format received");
        }
    
        const formattedCart = res.data.map((item) => {
    
          return {
            id: item.id,
            quantity: item.quantity,
            dish: item.dish_data ?? {}, 
          };
        });

        setCart(formattedCart);
      } catch (err) {
        setError("Failed to fetch cart items");
        console.error("Fetch Cart Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  return { cart, loading, error };
};

export default useFetchCart;
