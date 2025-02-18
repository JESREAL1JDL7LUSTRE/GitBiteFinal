import React, { useState } from "react";
import api from "../../api/api";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { Button } from "../ui/button";

interface OrderButtonProps {
  dishId: number[];  // This expects an array of dish IDs (in case you want to add multiple)
}

function OrderButton({ dishId }: OrderButtonProps) {
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);  // Track order success

  const addToOrder = async (): Promise<void> => {
    try {
      // Prepare data to send in the request
      const dishesToOrder = dishId.map(id => ({ dish_id: id, quantity: 1 }));

      const res = await api.post("/api/order/", { dishes: dishesToOrder });

      console.log(res.data);

      // If successful, trigger the payment pop-up
      setIsOrderSuccessful(true);  // Update state to show the PaymentPopUpForm
    } catch (error) {
      console.error("Failed to add to Order:", error);
      alert("Error adding items to Order.");
    }
  };

  const closePaymentPopUp = () => {
    setIsOrderSuccessful(false);  // Close the Payment PopUp
  };

  return (
    <div>
      <Button onClick={addToOrder}>Add to Order</Button>

      {/* Automatically show the PaymentPopUpForm if the order was successful */}
      <PaymentPopUpForm isOpen={isOrderSuccessful} onClose={closePaymentPopUp} />
    </div>
  );
}

export default OrderButton;
