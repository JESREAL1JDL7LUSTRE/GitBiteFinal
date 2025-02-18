import React from "react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // Fixed import path

interface PlanToOrderButtonProps {
  dish: { id: number; name: string };
}

function PlanToOrderButton({ dish }: PlanToOrderButtonProps) {
  const { addToPlanToOrder } = usePlanToOrder();

  return (
    <div>
      <button onClick={() => addToPlanToOrder(dish)}> plan Add to Order</button>
    </div>
  );
}

export default PlanToOrderButton;
