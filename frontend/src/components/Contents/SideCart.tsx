import React from "react";
import PlanToOrderPopUp from "../PopUps/PlanToOrderPopUp";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // ✅ Import context

const SideCart = () => {
  const { planToOrderList } = usePlanToOrder(); // ✅ Get items in cart

  if (planToOrderList.length === 0) return null; // ✅ Hide cart if empty

  return (
    <div className="sticky">
      <PlanToOrderPopUp />
    </div>
  );
};

export default SideCart;
