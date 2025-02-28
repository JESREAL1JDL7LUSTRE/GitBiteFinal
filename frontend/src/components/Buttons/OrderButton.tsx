import React, { useState } from "react";
import { Button } from "../ui/button";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { usePlanToOrderStore } from "../PopUps/Context/PlanToOrderContext"; // ✅ Bulk order store
import { useAddToOrderWhenPayingStore } from "@/lib/AddToOrderWhenPayingStore";

const OrderButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setDishDetails } = useAddToOrderWhenPayingStore(); // ✅ Zustand store for checkout
  const planToOrderList = usePlanToOrderStore((state) => state.planToOrderList); // ✅ Get selected items from cart

  const handleProceedToPayment = () => {
    if (planToOrderList.length === 0) return;
    
    // ✅ Ensure quantity is passed correctly
    const selectedDishes = planToOrderList.map((dish) => ({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: dish.quantity ?? 1, // ✅ Ensure quantity is set
    }));

    setDishDetails(selectedDishes);
    setIsOpen(true);
  };

  return (
    <div>
      <Button onClick={handleProceedToPayment} disabled={planToOrderList.length === 0}>
        Buy Now
      </Button>

      {isOpen && <PaymentPopUpForm isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default OrderButton;
