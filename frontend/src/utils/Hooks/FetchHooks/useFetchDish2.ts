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

const useFetchDishes = (page: number) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/dish/`, {
          params: { page }, // Only fetch by page
        });

        setDishes(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10)); // Assuming page_size=10
      } catch (err) {
        setError("Failed to fetch dishes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [page]); // Fetch only when page changes

  return { dishes, loading, error, setDishes, totalPages };
};

export default useFetchDishes;