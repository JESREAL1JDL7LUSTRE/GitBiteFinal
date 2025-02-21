import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from 'react-router-dom'

interface PaymentButtonProps {
  order: { id: number; total_price: number };
  dishDetails: { id: number, name: string; price: number }[]; // ✅ Accept dish details
}

function PaymentButton({ order, dishDetails }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [paymentMethods, setPaymentMethods] = useState<{ value: string; label: string }[]>([]);
  const nav = useNavigate();

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
      // ✅ Step 1: Create a new order with dish details
      const orderResponse = await api.post("/api/order/", {
        dishes: dishDetails.map(dish => ({
          dish_id: dish.id,  
          quantity: 1,  // Default quantity (adjust if needed)
        }))
      });
  
      if (!orderResponse.data || !orderResponse.data.id) {
        throw new Error("Order creation failed.");
      }
  
      const newOrderId = orderResponse.data.id;
      console.log("New Order Created:", newOrderId);
  
      // ✅ Step 2: Make the payment for the new order
      await api.post("/api/payment/", {
        order: newOrderId, 
        payment_method: paymentMethod,
        amount: order.total_price,  // Ensure this matches the backend calculation
      });
  
      setLoading(false);
      alert("Order paid successfully!");
    } catch (error) {
      console.error("Payment failed:", error);
      setLoading(false);
    }
      alert("Payment failed. Please log in to continue.");
      nav("/profile")
  };
  
  

  return (
    <div>
      <h3 className="font-semibold">Your Order:</h3>
      {dishDetails.map((dish, index) => (
        <div key={index} className="mb-2">
          <p>{dish.name} - Price: ${dish.price}</p>
        </div>
      ))}

      <label>
        Select Payment Method:
        {paymentMethods.length === 0 ? (
          <p>Loading payment methods...</p>
        ) : (
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={loading}
          >
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
