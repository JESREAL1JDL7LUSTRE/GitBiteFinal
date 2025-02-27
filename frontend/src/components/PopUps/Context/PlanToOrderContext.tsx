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
  closeCart: () => void;
  openCart: () => void;
}

export const PlanToOrderContext = createContext<PlanToOrderContextType | undefined>(undefined);

export function usePlanToOrder() {
  const context = useContext(PlanToOrderContext);
  if (!context) {
    throw new Error("usePlanToOrder must be used within a PlanToOrderProvider");
  }
  return context;
}

export const PlanToOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Load from sessionStorage on mount
  const [planToOrderList, setPlanToOrderList] = useState<Dish[]>(() => {
    try {
      const storedCart = sessionStorage.getItem("planToOrderList");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing sessionStorage data:", error);
      return [];
    }
  });

  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);

  useEffect(() => {
    if (planToOrderList.length === 0 && isSideCartOpen) {
      setIsSideCartOpen(false);
    }
  }, [planToOrderList.length, isSideCartOpen]);  

  // ✅ Listen for storage changes (Shared storage approach)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "planToOrderList") {
        try {
          const newCart = event.newValue ? JSON.parse(event.newValue) : [];
          setPlanToOrderList(newCart);
        } catch (error) {
          console.error("Error updating from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Update sessionStorage whenever the cart changes
  useEffect(() => {
    sessionStorage.setItem("planToOrderList", JSON.stringify(planToOrderList));
  }, [planToOrderList]);

  // ✅ Add a dish to the cart (handles duplicates properly)
  const addToPlanToOrder = (dish: Dish) => {
    setPlanToOrderList((prev) => {
      const updatedList = prev.some((item) => item.id === dish.id)
        ? prev.map((item) =>
            item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...dish, quantity: 1 }];

      sessionStorage.setItem("planToOrderList", JSON.stringify(updatedList));
      window.dispatchEvent(new StorageEvent("storage", { key: "planToOrderList", newValue: JSON.stringify(updatedList) })); // ✅ Broadcast update
      return updatedList;
    });

    setIsSideCartOpen(true);
  };

  // ✅ Update the quantity of a dish in the cart
  const updateDishQuantity = (id: number, changeAmount: number) => {
    setPlanToOrderList((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + changeAmount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Fully clear the cart (state + sessionStorage)
  const clearPlanToOrder = () => {
    setPlanToOrderList([]);
    sessionStorage.removeItem("planToOrderList");
    window.dispatchEvent(new StorageEvent("storage", { key: "planToOrderList", newValue: null })); // ✅ Broadcast update
    setIsSideCartOpen(false);
  };

  const closeCart = () => {
    setIsSideCartOpen(false);
  };

  const openCart = () => {
    setIsSideCartOpen(true);
    console.log("openCart");
  };

  return (
    <PlanToOrderContext.Provider
      value={{
        planToOrderList,
        addToPlanToOrder,
        clearPlanToOrder,
        updateDishQuantity,
        isSideCartOpen,
        closeCart,
        openCart
      }}
    >
      {children}
    </PlanToOrderContext.Provider>
  );
};
