import React from "react";
import usePostCart from "../../utils/Hooks/PostHooks/usePostCart";

interface CartButtonProps {
  dishId: number;
}

const CartButton: React.FC<CartButtonProps> = ({ dishId }) => {
  const { addToCart, loading, error } = usePostCart();

  return (
    <div>
      <button onClick={() => addToCart(dishId)} disabled={loading}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CartButton;
