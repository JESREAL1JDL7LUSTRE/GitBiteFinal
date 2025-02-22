import { useState } from "react";
import api from "../../../api/api";

interface PaymentData {
  order: number;
  payment_method: string;
  amount: number;
}

const usePostPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postPayment = async (paymentData: PaymentData) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/payment/", paymentData);
    } catch (err) {
      console.error("Payment failed:", err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { postPayment, loading, error };
};

export default usePostPayment;
