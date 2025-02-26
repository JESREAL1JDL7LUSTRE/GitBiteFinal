import React, { useState, useEffect, useRef } from "react";
import { usePlanToOrder } from "../PopUps/Context/PlanToOrderContext";
import { ShoppingCartIcon, Minus, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import OrderButton from "../Buttons/OrderButton";

const SideCart = () => {
  const { planToOrderList, isSideCartOpen, clearPlanToOrder, updateDishQuantity } = usePlanToOrder();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const deselectedItemsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setSelectedItems((prevSelected) => {
      const newItemIds = planToOrderList.map((dish) => dish.id);
      const stillSelected = prevSelected.filter(id => newItemIds.includes(id));
      const newSelections = newItemIds.filter(id => 
        !prevSelected.includes(id) && !deselectedItemsRef.current.has(id)
      );
      return [...stillSelected, ...newSelections];
    });
  }, [planToOrderList.length]);

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

  const totalPrice = planToOrderList
    .filter((dish) => selectedItems.includes(dish.id))
    .reduce((acc, dish) => acc + dish.price * dish.quantity, 0);

  if (!isSideCartOpen) return null;

  return (
    <div className="h-full bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          </div>
          <span className="text-sm text-gray-500">
            {planToOrderList.length} {planToOrderList.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Cart Contents */}
      <div className="flex-1 overflow-y-auto">
        {planToOrderList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm">Add some delicious dishes to get started!</p>
          </div>
        ) : (
          <div className="divide-y">
            {planToOrderList.map((dish) => (
              <div key={dish.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedItems.includes(dish.id)}
                      onChange={() => handleSelectItem(dish.id)}
                    />
                  </div>

                  {/* Dish Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 min-w-0 text-start">
                    <h3 className="font-small text-gray-900 truncate">{dish.name}</h3>
                    <p className="font-bold">${dish.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateDishQuantity(dish.id, -1)}
                        disabled={dish.quantity <= 1}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-medium text-gray-900">{dish.quantity}</span>
                      <button
                        onClick={() => updateDishQuantity(dish.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {planToOrderList.length > 0 && (
        <div className="border-t p-4 space-y-4">
          {/* Total */}
          <div className="flex flex-col gap-2 items-start">
            <span className="text-gray-600">Order Total:</span>
            <span className="text-xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {selectedItems.length > 0 && (
              <>
                <OrderButton
                  dishDetails={planToOrderList.filter((dish) => selectedItems.includes(dish.id))}
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                />
                <Button
                  onClick={clearSelectedItems}
                  className="w-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Remove Selected
                </Button>
              </>
            )}
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-gray-100 bg-white-100 border-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </Button>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all items from your cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={() => {
                clearPlanToOrder();
                setIsDialogOpen(false);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Clear All
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SideCart;