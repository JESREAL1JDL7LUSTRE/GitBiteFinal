import React, { useState } from "react";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { Button } from "../ui/button";
import usePostOrder from "@/utils/Hooks/PostHooks/usePostOrder";

interface PaymentButtonProps {
  dishDetails: { id: number; name: string; price: number }[];
}

function PaymentButton({ dishDetails }: PaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<{ id: number; total_price: number } | null>(null);
  const { createOrder, loading, error } = usePostOrder(); // ⬅️ No `processPayment` here

  const handleCreateOrder = async () => {
    try {
      const newOrder = await createOrder(dishDetails);
      if (!newOrder) {
        throw new Error("Failed to create order.");
      }

      setOrder(newOrder); // ✅ Store the order
      setIsOpen(true); // ✅ Open payment popup
    } catch (err) {
      console.error("❌ Order Error:", err);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div>
      <Button onClick={handleCreateOrder} disabled={loading}>
        {loading ? "Creating Order..." : "Buy Now"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {/* Payment Pop-Up Form */}
      {isOpen && order && (
        <PaymentPopUpForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          order={order} // ✅ Pass created order
          dishDetails={dishDetails}
        />
      )}
    </div>
  );
}

export default PaymentButton;
