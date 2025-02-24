
import { createContext, useContext, useState } from "react";

interface Dish {
  id: number;
  name: string;
  price: number;
}

interface PlanToOrderContextType {
  planToOrderList: Dish[];
  addToPlanToOrder: (dish: Dish) => void;
  clearPlanToOrder: () => void;
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
    setPlanToOrderList((prev) => [...prev, dish]);
    setIsSideCartOpen(true); // Open SideCart when adding an item
  };

  const clearPlanToOrder = () => {
    setPlanToOrderList([]);  
    setIsSideCartOpen(false);
  };

  return (
    <PlanToOrderContext.Provider value={{ planToOrderList, addToPlanToOrder, clearPlanToOrder, isSideCartOpen  }}>
      {children}
    </PlanToOrderContext.Provider>
  );
};