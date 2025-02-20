import { useState, useEffect } from "react";
import api from "../../api/api";

interface PaymentButtonProps {
  orderId: number;
  orderAmount: number;
}

function PaymentButton({ orderId, orderAmount }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [paymentMethods, setPaymentMethods] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await api.get("/api/payment-methods/");
        if (res.data.payment_methods && Array.isArray(res.data.payment_methods)) {
          setPaymentMethods(
            res.data.payment_methods.map(([value, label]: [string, string]) => ({ value, label }))
          );
        } else {
          alert("Unexpected data format for payment methods.");
        }
      } catch (error) {
        console.error("Failed to load payment methods:", error);
        alert("Failed to load payment methods.");
      }
    };

    fetchPaymentMethods();
  }, []);

  const PayOrder = async (): Promise<void> => {
    setLoading(true);
    try {
      await api.post(
        "/api/payment/",
        { order: orderId, payment_method: paymentMethod, amount: orderAmount }
      );
      setLoading(false);
      alert("Order paid successfully!");
    } catch (error) {
      console.error("Payment failed:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <label>
        Select Payment Method:
        {paymentMethods.length === 0 ? (
          <p>Loading payment methods...</p>
        ) : (
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} disabled={loading}>
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        )}
      </label>

      <button onClick={PayOrder} disabled={loading || !paymentMethod}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
}

export default PaymentButton;
