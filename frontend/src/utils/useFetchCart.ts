// src/hooks/useFetchCart.ts
import { useState, useEffect } from "react";
import api from "../api/api"; // Ensure this is the correct path for your API

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
  dish: Dish; // Now includes full dish details
}

const useFetchCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        const res = await api.get<CartItem[]>("/api/cart/");
        setCart(res.data);
        console.log(res.data)
      } catch (err) {
        setError("Failed to fetch cart items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  return { cart, loading, error };
};

export default useFetchCart;
