import { ShoppingCartIcon, X } from "lucide-react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  type: "open" | "close";
}

const SideCartButton = ({ type }: CartButtonProps) => {
  const { openCart, closeCart } = usePlanToOrder();

  return (
    <Button className="bg-white border-black shadow-md" onClick={type === "open" ? openCart : closeCart}>
      {type === "open" ? (
        <ShoppingCartIcon color="black" className="w-5 h-5 md:w-6 md:h-6 " />
      ) : (
        <X color="black" className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SideCartButton;
