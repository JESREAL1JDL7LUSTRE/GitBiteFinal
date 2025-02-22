// src/hooks/useFetchPayments.ts
import { useState, useEffect } from "react";
import api from "../../../api/api";// Ensure this is the correct path for your API

export interface CategoryItem {
    id: number;
    name: string;
}

const useFetchCategory = () => {
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        const res = await api.get<CategoryItem[]>("/api/category/");
        setCategory(res.data);
      } catch (err) {
        setError("Failed to fetch payment details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  return { category, loading, error };
};

export default useFetchCategory;
