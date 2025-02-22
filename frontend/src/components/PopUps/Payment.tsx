import React, { useState } from "react";
import useFetchPaymentMethods from "../../utils/Hooks/FetchHooks/useFetchPaymentMethod";
import usePostOrder from "../../utils/Hooks/PostHooks/usePostOrder"; // ✅ Import new hook

interface PaymentButtonProps {
  order: { id: number; total_price: number };
  dishDetails: { id: number; name: string; price: number }[];
}

function PaymentButton({ order, dishDetails }: PaymentButtonProps) {
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const { paymentMethods, loading: methodsLoading, error: fetchError } = useFetchPaymentMethods();
  const { createOrderAndPay, loading: paymentLoading, error: paymentError } = usePostOrder();

  const handlePayment = () => {
    createOrderAndPay(dishDetails, paymentMethod, order.total_price);
  };

  return (
    <div>
      <h3 className="font-semibold">Your Order:</h3>
      {dishDetails.map((dish, index) => (
        <div key={index} className="mb-2">
          <p>{dish.name} - Price: ${dish.price.toFixed(2)}</p>
        </div>
      ))}

      <label>
        Select Payment Method:
        {methodsLoading ? (
          <p>Loading payment methods...</p>
        ) : fetchError ? (
          <p className="text-red-500">{fetchError}</p>
        ) : (
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={paymentLoading}
          >
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        )}
      </label>

      {paymentError && <p className="text-red-500">{paymentError}</p>}

      <button onClick={handlePayment} disabled={paymentLoading || !paymentMethod}>
        {paymentLoading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
}

export default PaymentButton;
