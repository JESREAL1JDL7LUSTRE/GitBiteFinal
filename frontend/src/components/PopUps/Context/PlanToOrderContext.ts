import { create } from "zustand";

interface Dish {
  image: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PlanToOrderState {
  planToOrderList: Dish[];
  isSideCartOpen: boolean;
  addToPlanToOrder: (dish: Dish) => void;
  updateDishQuantity: (id: number, changeAmount: number) => void;
  clearPlanToOrder: () => void;
  openSideCart: () => void;
  closeSideCart: () => void;
}

export const usePlanToOrderStore = create<PlanToOrderState>((set) => ({
  planToOrderList: [],
  isSideCartOpen: false, // Initial state: closed

  addToPlanToOrder: (dish) =>
    set((state) => {
      const updatedList = state.planToOrderList.some((item) => item.id === dish.id)
        ? state.planToOrderList.map((item) =>
            item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...state.planToOrderList, { ...dish, quantity: 1 }];

      return { planToOrderList: updatedList, isSideCartOpen: true }; // Open cart when adding
    }),

  updateDishQuantity: (id, changeAmount) =>
    set((state) => {
      const updatedList = state.planToOrderList
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + changeAmount } : item
        )
        .filter((item) => item.quantity > 0);

      return { planToOrderList: updatedList };
    }),

  clearPlanToOrder: () =>
    set(() => ({ planToOrderList: [], isSideCartOpen: false })),

  openSideCart: () => set(() => ({ isSideCartOpen: true })),
  closeSideCart: () => set(() => ({ isSideCartOpen: false })),
}));
