import { useState, useEffect } from "react";
import api from "../../../api/api";

interface OrderedItem {
  id: number;
  dish_name: string;
  quantity: number;
  subtotal: number;
  dishId: number;
  image?: string;
}

export interface Order {
  id: number;
  customer: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  ordered_items: OrderedItem[];
}

const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get<Order[]>("/api/order/");
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return { orders, loading, error };
};

export default useFetchOrders;
