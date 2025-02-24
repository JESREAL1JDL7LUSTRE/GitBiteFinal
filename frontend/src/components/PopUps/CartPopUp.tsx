import React, { useState } from "react";
import { usePlanToOrder } from "./Context/PlanToOrderContext";
import OrderButton from "../Buttons/OrderButton";
import { Button } from "../ui/button"; // Adjust according to your setup
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Customize if needed
import { ShoppingCartIcon } from "lucide-react";

function CartPopUp() {
  const { planToOrderList, clearPlanToOrder, updateDishQuantity } = usePlanToOrder();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

  const handleClearClick = () => {
    setIsDialogOpen(true); // Open confirmation dialog
  };

  const confirmClear = () => {
    clearPlanToOrder(); // Clear the list
    setIsDialogOpen(false); // Close dialog
  };

  const cancelClear = () => {
    setIsDialogOpen(false); // Close dialog without clearing
  };

  const increaseQuantity = (id: number) => {
    updateDishQuantity(id, 1);
  };

  const decreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateDishQuantity(id, -1);
    }
  };

  return (
    <div className="sticky top-16 bg-white border p-4 px-2 shadow-md rounded-lg">
      <div className="flex justify-start gap-4">
        <ShoppingCartIcon />
        <h2 className="text-s font-bold">Your Cart</h2>
      </div>

      {planToOrderList.length === 0 ? (
        <p className="text-gray-500">Cart Empty</p>
      ) : (
        <ul className="p-2">
          {planToOrderList.map((dish) => (
            <li key={dish.id} className="border-b p-3 flex justify-start">
              <div className="flex">
                <img src={dish.image} alt={dish.name} className="w-24 h-24" />
                <div className="p-2 flex flex-col">
                  <p className="text-md">{dish.name}</p>
                  <p className="text-sm text-start text-gray-600">Price: ${dish.price}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-red-500 px-2 py-1 rounded"
                      onClick={() => decreaseQuantity(dish.id, dish.quantity)}
                    >
                      -
                    </Button>
                    <p className="text-md">{dish.quantity}</p>
                    <Button
                      className="bg-green-500 px-2 py-1 rounded"
                      onClick={() => increaseQuantity(dish.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Order Button */}
      {planToOrderList.length > 0 && <OrderButton dishDetails={planToOrderList} />}

      {/* Clear Button */}
      <div className="mt-4 flex justify-between">
        {planToOrderList.length > 0 && (
          <Button
            onClick={handleClearClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all the planned dishes? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelClear}>Cancel</AlertDialogCancel>
            <Button onClick={confirmClear} className="bg-red-600 text-white">
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CartPopUp;
