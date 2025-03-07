import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, deleteOrder } from "@/api/OrderApi";
import { Order } from "@/types/Types";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing order mutations (Create & Delete)
 */
const useOrderMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Mutation for creating an order
  const createOrderMutation = useMutation<Order, Error, { id: number; quantity: number }[]>({
    mutationFn: createOrder,
    onError: (error) => {
      console.error("❌ Error creating order:", error);
      alert("Error adding items to Order. Please log in.");
      navigate("/signin");
    },
  });

  // ✅ Mutation for deleting an order
  const deleteOrderMutation = useMutation<void, Error, number>({
    mutationFn: deleteOrder,
    onSuccess: () => {
      console.log("✅ Order deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresh orders after deletion
    },
    onError: (error) => {
      console.error("❌ Order deletion failed:", error);
      alert("Failed to delete Order. Please try again.");
    },
  });

  return {
    deleteOrderMutation,
    createOrderMutation
  };
};

export default useOrderMutations;
