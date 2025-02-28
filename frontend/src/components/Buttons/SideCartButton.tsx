import { ShoppingCartIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlanToOrderStore } from "../PopUps/Context/PlanToOrderContext";

interface CartButtonProps {
  type: "open" | "close";
}

const SideCartButton = ({ type }: CartButtonProps) => {
  const openSideCart = usePlanToOrderStore((state) => state.openSideCart);
  const closeSideCart = usePlanToOrderStore((state) => state.closeSideCart);

  return (
    <Button variant="outline" className="" onClick={type === "open" ? openSideCart : closeSideCart}>
      {type === "open" ? (
        <ShoppingCartIcon className="w-5 h-5 md:w-6 md:h-6" />
      ) : (
        <X color="black" className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SideCartButton;
