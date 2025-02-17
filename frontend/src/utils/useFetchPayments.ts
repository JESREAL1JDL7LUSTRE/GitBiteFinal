// src/hooks/useFetchPayments.ts
import { useState, useEffect } from "react";
import api from "../api/api"; // Ensure this is the correct path for your API

export interface PaymentItem {
  id: number;
  order: number;
  payment_method: string;
  transaction_id: string;
  amount: number;
}

const useFetchPayments = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      try {
        const res = await api.get<PaymentItem[]>("/api/payment/");
        setPayments(res.data);
      } catch (err) {
        setError("Failed to fetch payment details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPayments();
  }, []);

  return { payments, loading, error };
};

export default useFetchPayments;
