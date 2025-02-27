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
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  dish: Dish;
}

const useFetchCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/cart/");
    
        if (!Array.isArray(res.data)) {
          throw new Error("Invalid cart data format received");
        }
    
        const formattedCart = res.data.map((item) => {
          if (!item.dish_data) {
            throw new Error(`Missing dish data for cart item with id ${item.id}`);
          }
          
          return {
            id: item.id,
            quantity: item.quantity,
            dish: {
              id: item.dish_data.id ?? 0, // Default values to prevent crashes
              name: item.dish_data.name ?? "Unknown Dish",
              description: item.dish_data.description ?? "",
              recipes: item.dish_data.recipes ?? 0,
              category: item.dish_data.category ?? "Uncategorized",
              available: item.dish_data.available ?? false,
              image: item.dish_data.image ?? "",
              price: item.dish_data.price ?? 0,
            },
          };
        });

        setCart(formattedCart);
      } catch (err) {
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
