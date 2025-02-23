import React from "react";
import usePostCart from "../../utils/Hooks/PostHooks/usePostCart";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface CartButtonProps {
  dishId: number;
}

const WishlistButton: React.FC<CartButtonProps> = ({ dishId }) => {
  const { addToCart, loading, error } = usePostCart();

  return (
    <div>
      <Button className=" bg-black rounded-full shadow-md" onClick={() => addToCart(dishId)} disabled={loading}>
        {loading ? "Adding..." : <Heart />}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};    

export default WishlistButton;
