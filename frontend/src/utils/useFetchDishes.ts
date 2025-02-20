// src/hooks/useFetchDishes.ts
import { useEffect, useState } from "react";
import api from "../api/api";

// Dish type in useFetchDishes.ts or wherever it's defined
export interface Dish {
  id: number;
  name: string;
  description: string;
  recipes: string;
  category_name: string;
  available: boolean;
  price: number;        // Add the price field
  image?: string;       // Optional field for the image
}


const useFetchDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDish = async () => {
      setLoading(true);
      try {
        const res = await api.get<Dish[]>("/api/dish/");
        setDishes(res.data);
      } catch (err) {
        setError("Failed to fetch dishes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDish();
  }, []);

  return { dishes, loading, error };
};

export default useFetchDishes;
