import { createContext, useContext, useState } from "react";

interface Dish {
  id: number;
  name: string;
  price: number;
  quantity: number; // Added quantity
}

interface PlanToOrderContextType {
  planToOrderList: Dish[];
  addToPlanToOrder: (dish: Dish) => void;
  clearPlanToOrder: () => void;
  updateDishQuantity: (id: number, changeAmount: number) => void; // New function
  isSideCartOpen: boolean;
}

const PlanToOrderContext = createContext<PlanToOrderContextType | undefined>(undefined);

export function usePlanToOrder() {
  const context = useContext(PlanToOrderContext);
  if (!context) {
    throw new Error("usePlanToOrder must be used within a PlanToOrderProvider");
  }
  return context;
}

export const PlanToOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [planToOrderList, setPlanToOrderList] = useState<Dish[]>([]);
  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);

  const addToPlanToOrder = (dish: Dish) => {
    setPlanToOrderList((prev) => {
      const existingDish = prev.find((item) => item.id === dish.id);
      if (existingDish) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
    setIsSideCartOpen(true); // Open SideCart when adding an item
  };

  const updateDishQuantity = (id: number, changeAmount: number) => {
    setPlanToOrderList((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + changeAmount } : item
        )
        .filter((item) => item.quantity > 0) // Remove items if quantity becomes 0
    );
  };

  const clearPlanToOrder = () => {
    setPlanToOrderList([]);
    setIsSideCartOpen(false);
  };

  return (
    <PlanToOrderContext.Provider
      value={{
        planToOrderList,
        addToPlanToOrder,
        clearPlanToOrder,
        updateDishQuantity, // Provide update function
        isSideCartOpen,
      }}
    >
      {children}
    </PlanToOrderContext.Provider>
  );
};
