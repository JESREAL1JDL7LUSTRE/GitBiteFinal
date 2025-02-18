import React, { createContext, useContext, useState, ReactNode } from "react";

interface Dish {
  id: number;
  name: string;
}

interface PlanToOrderContextType {
  planToOrderList: Dish[];
  addToPlanToOrder: (dish: Dish) => void;
}

const PlanToOrderContext = createContext<PlanToOrderContextType | undefined>(
  undefined
);

export const PlanToOrderProvider = ({ children }: { children: ReactNode }) => {
  const [planToOrderList, setPlanToOrderList] = useState<Dish[]>([]);

  const addToPlanToOrder = (dish: Dish) => {
    setPlanToOrderList((prevList) => [...prevList, dish]);
  };

  return (
    <PlanToOrderContext.Provider value={{ planToOrderList, addToPlanToOrder }}>
      {children}
    </PlanToOrderContext.Provider>
  );
};

export const usePlanToOrder = () => {
  const context = useContext(PlanToOrderContext);
  if (!context) {
    throw new Error("usePlanToOrder must be used within a PlanToOrderProvider");
  }
  return context;
};
