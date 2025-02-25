import React, { useState, useEffect, useRef } from "react";
import { usePlanToOrder } from "./Context/PlanToOrderContext";
import OrderButton from "../Buttons/OrderButton";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShoppingCartIcon } from "lucide-react";

function CartPopUp() {
  const { planToOrderList, clearPlanToOrder, updateDishQuantity } = usePlanToOrder();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const deselectedItemsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setSelectedItems((prevSelected) => {
      const newItemIds = planToOrderList.map((dish) => dish.id);
  
      // Items that were selected but still in cart
      const stillSelected = prevSelected.filter(id => newItemIds.includes(id));
  
      // Find new items (not in prevSelected or deselectedItems)
      const newSelections = newItemIds.filter(id => 
        !prevSelected.includes(id) && !deselectedItemsRef.current.has(id)
      );
  
      return [...stillSelected, ...newSelections]; // Keep selected + add new
    });
  }, [planToOrderList.length]);        
  // Toggle item selection
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        deselectedItemsRef.current.add(id); 
        return prev.filter((itemId) => itemId !== id);
      } else {
        deselectedItemsRef.current.delete(id); 
        return [...prev, id];
      }
    });
  };
  
  const clearSelectedItems = () => {
    if (selectedItems.length === planToOrderList.length) {
      clearPlanToOrder(); 
    } else {
      selectedItems.forEach((id) => updateDishQuantity(id, -99999));
    }
  
    setSelectedItems([]); 
  };
  
  // Calculate total price based on selected items
  const totalPrice = planToOrderList
    .filter((dish) => selectedItems.includes(dish.id))
    .reduce((acc, dish) => acc + dish.price * dish.quantity, 0);

  return (
    <div className="sticky top-20 bg-white border p-3 px-4 shadow-md rounded-lg">
      <div className="flex justify-start gap-3">
        <ShoppingCartIcon />
        <h2 className="text-s font-bold">Your Cart</h2>
      </div>

      {planToOrderList.length === 0 ? (
        <p className="text-gray-500">Cart Empty</p>
      ) : (
        <ul className="py-1 mt-4 max-h-96 overflow-y-auto">
          {planToOrderList.map((dish) => (
            <li key={dish.id} className="border-b px-1 py-2 flex justify-start items-center">
              {/* Checkbox for selection */}
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedItems.includes(dish.id)}
                onChange={() => handleSelectItem(dish.id)}
              />

              <div className="flex">
                <img src={dish.image} alt={dish.name} className="w-20 h-20" />
                <div className="p-1.5 flex flex-col">
                  <p className="text-xs text-start font-bold">{dish.name}</p>
                  <p className="text-sm text-start text-gray-600">Price: ${dish.price}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-red-500 px-2 py-1 rounded"
                      onClick={() => updateDishQuantity(dish.id, -1)}
                      disabled={dish.quantity <= 1}
                    >
                      -
                    </Button>
                    <p className="text-md">{dish.quantity}</p>
                    <Button
                      className="bg-green-500 px-2 py-1 rounded"
                      onClick={() => updateDishQuantity(dish.id, 1)}
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

      {/* Order Total (Only for Selected Items) */}
      <div className="mt-3 flex flex-col items-start">
        <h1 className="text-md font-semibold">Order Total:</h1>
        <h2 className="text-xl font-bold">${totalPrice.toFixed(2)}</h2>
      </div>

      {/* Order Button - Only for Selected Items */}
      <div className="mt-2">
        {selectedItems.length > 0 && (
          <OrderButton dishDetails={planToOrderList.filter((dish) => selectedItems.includes(dish.id))} />
        )}
      </div>

      <div className="flex mt-4 justify-center center gap-2">
        <div className="">
          {selectedItems.length > 0 && (
            <Button
              onClick={clearSelectedItems}
              className="bg-red-500 text-white rounded hover:bg-red-700"
            >
              Clear Selected
            </Button>
          )}
        </div>

        {/* Clear All Button */}
          <div className="">
            {planToOrderList.length > 0 && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>    
      {/* Clear Selected Button */}

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
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
            <Button onClick={clearPlanToOrder} className="bg-red-600 text-white">
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CartPopUp;
