import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import useMutationCart from "@/utils/Hooks/Tanstack/Wishlist/useMutationCart";

interface WishlistButtonProps {
  dishId: number;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ dishId }) => {
  const { useMutationCartAdd } = useMutationCart();
  const { mutate: addToWishlist, isPending: loading, error } = useMutationCartAdd();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = async () => {
    if (isWishlisted) return;
    addToWishlist({ dishId }, { onSuccess: () => setIsWishlisted(true) });
  };

  return (
    <div>
      <Button
        className={`rounded-full shadow-md p-3 transition-colors duration-300 
          ${isWishlisted ? "bg-white border border-gray-300" : "bg-black"}`}
        onClick={handleWishlist}
        disabled={loading}
      >
        <Heart fill={isWishlisted ? "red" : "none"} color={isWishlisted ? "red" : "white"} />
      </Button>
      {error && <p className="text-red-500">{(error as Error).message}</p>}
    </div>
  );
};

export default WishlistButton;
