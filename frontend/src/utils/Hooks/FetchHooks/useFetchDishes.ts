import { useEffect, useState } from "react";
import api from "../../../api/api";

export interface Dish {
  featured: unknown;
  id: number;
  name: string;
  description: string;
  recipes: string;
  category_name: string;
  available: boolean;
  price: number;
  image?: string;
}

const useFetchDishes = (searchQuery = "") => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(`/api/dish/?search=${searchQuery}`);

  const fetchDishes = async () => {
    if (!nextPage) return;

    setLoading(true);
    try {
      const res = await api.get(nextPage);
      setDishes(prev => [...prev, ...res.data.results]); // Append paginated data
      setNextPage(res.data.next); // Store next page URL
    } catch (err) {
      setError("Failed to fetch dishes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDishes([]); // Reset when search query changes
    setNextPage(`/api/dish/?search=${searchQuery}`);
  }, [searchQuery]);

  return { dishes, loading, error, fetchDishes, nextPage };
};

export default useFetchDishes;
