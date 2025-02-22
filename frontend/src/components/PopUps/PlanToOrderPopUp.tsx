import React, { useState } from "react";
import { usePlanToOrder } from "./Context/PlanToOrderContext";
import OrderButton from "../DifferentButtons/OrderButton";
import { Button } from "../ui/button"; // Adjust according to your setup
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Customize if needed

function PlanToOrderPopUp() {
  const { planToOrderList, clearPlanToOrder } = usePlanToOrder();
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

  return (
    <div className="sticky top-16 bg-white border p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Cart</h2>

      {planToOrderList.length === 0 ? (
        <p className="text-gray-500">Cart Empty</p>
      ) : (
        <ul className="space-y-2 ">
          {planToOrderList.map((dish) => (
            <li key={dish.id} className="border-b py-2 flex justify-center items-center">
              <div>
                <p className="font-semibold">{dish.name}</p>
                <p className="text-gray-600">Price: ${dish.price}</p>
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

export default PlanToOrderPopUp;
