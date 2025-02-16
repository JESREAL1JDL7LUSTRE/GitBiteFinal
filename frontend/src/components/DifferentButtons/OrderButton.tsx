import api from "../../api/api";

interface OrderButtonProps {
  dishId: number;  // Ensure dishId is properly defined
}

function OrderButton({ dishId }: OrderButtonProps) {
  const addToOrder = async (): Promise<void> => {  // No need for dishId param here
    try {
      const res = await api.post(
        "/api/order/",
        { dish: dishId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Item added to Order!");
      console.log(res.data);
    } catch (error) {
      console.error("Failed to add to Order:", error);
      alert("Error adding item to Order.");
    }
  };

  return (
    <div>
      <button onClick={addToOrder}>Add to Order</button>
    </div>
  );
}

export default OrderButton;
