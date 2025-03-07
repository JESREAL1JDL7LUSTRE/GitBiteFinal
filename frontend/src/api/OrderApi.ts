import { DishOrder, Order } from "@/types/Types";
import api from "./api";

export const getOrders = async (): Promise<Order[]> => {
    try {
        const res = await api.get<Order[]>("/api/order/");
        return res.data;
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        throw error;
    }
};

export const createOrder = async (dishDetails: DishOrder[]): Promise<Order> => {
  try {
    const dishesToOrder = dishDetails.map(dish => ({
      dish_id: dish.id,
      quantity: dish.quantity,
    }));

    const res = await api.post<Order>("/api/order/", { dishes: dishesToOrder });

    return res.data; // Return order data
  } catch (error) {
    console.error("❌ Error creating order:", error);
    throw error;
  }
};

/**
 * Deletes an order by its ID.
 * @param orderId - The ID of the order to delete.
 */
export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await api.delete(`/api/order/${orderId}/`);
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    throw error;
  }
};
