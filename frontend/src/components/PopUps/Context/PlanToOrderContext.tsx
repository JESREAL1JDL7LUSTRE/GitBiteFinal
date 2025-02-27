import { createContext, useContext, useState, useEffect } from "react";

interface Dish {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PlanToOrderContextType {
  planToOrderList: Dish[];
  addToPlanToOrder: (dish: Dish) => void;
  clearPlanToOrder: () => void;
  updateDishQuantity: (id: number, changeAmount: number) => void;
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
  const [planToOrderList, setPlanToOrderList] = useState<Dish[]>(() => {
    // Load from localStorage on mount
    const storedCart = localStorage.getItem("planToOrderList");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("planToOrderList", JSON.stringify(planToOrderList));
  }, [planToOrderList]);

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
    setIsSideCartOpen(true);
  };

  const updateDishQuantity = (id: number, changeAmount: number) => {
    setPlanToOrderList((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + changeAmount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearPlanToOrder = () => {
    setPlanToOrderList([]);
    localStorage.removeItem("planToOrderList");
    setIsSideCartOpen(false);
  };

  return (
    <PlanToOrderContext.Provider
      value={{
        planToOrderList,
        addToPlanToOrder,
        clearPlanToOrder,
        updateDishQuantity,
        isSideCartOpen,
      }}
    >
      {children}
    </PlanToOrderContext.Provider>
  );
};
