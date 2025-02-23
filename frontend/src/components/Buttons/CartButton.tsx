import React from "react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // Fixed import path
import { Button } from "../ui/button";

interface PlanToOrderButtonProps {
  dish: { id: number; name: string; price: number }; // Ensure the required properties are passed
}

function CartButton({ dish }: PlanToOrderButtonProps) {
  const { addToPlanToOrder } = usePlanToOrder();

  return (
    <div>
      <Button className="bg-green-500" onClick={() => addToPlanToOrder(dish)}>Add to Cart</Button>
    </div>
  );
}

export default CartButton;
