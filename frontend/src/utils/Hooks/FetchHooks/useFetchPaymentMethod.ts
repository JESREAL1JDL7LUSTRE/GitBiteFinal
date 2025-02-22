import { useEffect, useState } from "react";
import api from "../../../api/api";

interface PaymentMethod {
  value: string;
  label: string;
}

const useFetchPaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await api.get("/api/payment-methods/");
        if (res.data.payment_methods && Array.isArray(res.data.payment_methods)) {
          setPaymentMethods(
            res.data.payment_methods.map(([value, label]: [string, string]) => ({ value, label }))
          );
        } else {
          setError("Unexpected data format for payment methods.");
        }
      } catch (err) {
        console.error("Failed to load payment methods:", err);
        setError("Failed to load payment methods.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  return { paymentMethods, loading, error };
};

export default useFetchPaymentMethods;
