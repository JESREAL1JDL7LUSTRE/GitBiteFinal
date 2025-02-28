import { useState } from "react";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { Button } from "../ui/button";
import { useAddToOrderWhenPayingStore } from "@/lib/AddToOrderWhenPayingStore";

interface PaymentButtonProps {
  dishDetails: { id: number; name: string; price: number; quantity: number }[];
}

function PaymentButton({ dishDetails }: PaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setDishDetails } = useAddToOrderWhenPayingStore(); // Zustand store

  const handleProceedToPayment = () => {
    setDishDetails(dishDetails); // ✅ Store order in Zustand
    setIsOpen(true); // ✅ Open payment popup
  };

  return (
    <div>
      <Button onClick={handleProceedToPayment}>Buy Now</Button>

      {/* Payment Pop-Up Form */}
      {isOpen && <PaymentPopUpForm isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default PaymentButton;
