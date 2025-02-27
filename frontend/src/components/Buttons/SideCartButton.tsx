import { ShoppingCartIcon, X } from "lucide-react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  type: "open" | "close";
}

const SideCartButton = ({ type }: CartButtonProps) => {
  const { openCart, closeCart } = usePlanToOrder();

  return (
    <Button onClick={type === "open" ? openCart : closeCart}>
      {type === "open" ? (
        <ShoppingCartIcon className="w-5 h-5 md:w-6 md:h-6 " />
      ) : (
        <X className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SideCartButton;
