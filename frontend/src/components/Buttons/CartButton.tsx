import { usePlanToOrderStore } from "../PopUps/Context/PlanToOrderContext";
import { Button } from "../ui/button";

interface PlanToOrderButtonProps {
  dish: { id: number; name: string; price: number;image: string };
}

function CartButton({ dish }: PlanToOrderButtonProps) {
  const addToPlanToOrder = usePlanToOrderStore((state) => state.addToPlanToOrder);

  return (
    <div>
      <Button 
        className="bg-[#a0c878] hover:bg-[#a0c878]-500" 
        onClick={() => addToPlanToOrder({ ...dish, quantity: 1 })}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default CartButton;