import React, { useState } from "react";
import usePostCart from "../../utils/Hooks/PostHooks/usePostCart";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface CartButtonProps {
  dishId: number;
}

const WishlistButton: React.FC<CartButtonProps> = ({ dishId }) => {
  const { addToCart, loading, error } = usePostCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = async () => {
    await addToCart(dishId);
    setIsWishlisted(true);
  };

  return (
    <div>
      <Button 
        className={`rounded-full shadow-md p-3 transition-colors duration-300 
          ${isWishlisted ? "bg-white border border-gray-300" : "bg-black"}`} 
        onClick={handleWishlist} 
        disabled={loading}
      >
        {<Heart fill={isWishlisted ? "red" : "none"} color={isWishlisted ? "red" : "white"} />}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>  );
};    

export default WishlistButton;