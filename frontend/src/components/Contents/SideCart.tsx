import React from "react";
import CartPopUp from "../PopUps/CartPopUp";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext"; // ✅ Import context

const SideCart = () => {
  const { planToOrderList, isSideCartOpen } = usePlanToOrder(); // ✅ Get cart state

  if (!isSideCartOpen) return null; // ✅ Hide cart when closed

  return (
    <div className="fixed right-0 top-0 h-full w-80 p-2">
      <h2 className="text-lg font-bold">Your Cart</h2>
      {planToOrderList.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <CartPopUp />
      )}
    </div>
  );
};

export default SideCart;
