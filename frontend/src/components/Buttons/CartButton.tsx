import React from "react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // Fixed import path
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface PlanToOrderButtonProps {
  dish: { id: number; name: string; price: number }; // Ensure the required properties are passed
}

function CartButton({ dish }: PlanToOrderButtonProps) {
  const { addToPlanToOrder } = usePlanToOrder();

  return (
    <div>
      <Button className="bg-green-500" onClick={() => addToPlanToOrder({ ...dish, quantity: 1 })}><ShoppingCartIcon /></Button>
    </div>
  );
}

export default CartButton;
