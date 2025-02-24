import React from "react";
import CartPopUp from "../PopUps/CartPopUp";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // ✅ Import context

const SideCart = () => {
  const { planToOrderList } = usePlanToOrder(); // ✅ Get items in cart

  if (planToOrderList.length === 0) return null; // ✅ Hide cart if empty

  return (
    <div className="sticky">
      <CartPopUp />
    </div>
  );
};

export default SideCart;
