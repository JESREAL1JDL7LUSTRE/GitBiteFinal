import React from "react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // Fixed import path

interface PlanToOrderButtonProps {
  dish: { id: number; name: string; price: number }; // Ensure the required properties are passed
}

function PlanToOrderButton({ dish }: PlanToOrderButtonProps) {
  const { addToPlanToOrder } = usePlanToOrder();

  return (
    <div>
      <button onClick={() => addToPlanToOrder(dish)}>Add to Cart</button>
    </div>
  );
}

export default PlanToOrderButton;
