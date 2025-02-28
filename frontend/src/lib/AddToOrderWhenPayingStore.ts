import { create } from "zustand";

interface OrderState {
  dishDetails: { id: number; name: string; price: number; quantity: number }[];
  setDishDetails: (dishes: OrderState["dishDetails"]) => void;
  clearDishDetails: () => void;
}

export const useAddToOrderWhenPayingStore = create<OrderState>((set) => ({
  dishDetails: [],
  setDishDetails: (dishes) => set({ dishDetails: dishes }), // ✅ Preserve quantity
  clearDishDetails: () => set({ dishDetails: [] }),
}));
