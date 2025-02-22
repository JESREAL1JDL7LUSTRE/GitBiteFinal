import React, { useState } from "react";
import api from "../../api/api";
import { Button } from "../ui/button";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { useNavigate } from 'react-router-dom'

interface OrderButtonProps {
  dishDetails: { id: number; name: string; price: number }[];
}

function OrderButton({ dishDetails }: OrderButtonProps) {
  const nav = useNavigate()
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  const [order, setOrder] = useState<{ id: number; total_price: number } | null>(null);

  const addToOrder = async (): Promise<void> => {
    try {
      const dishesToOrder = dishDetails.map(dish => ({
        dish_id: dish.id
      }));

      const res = await api.post("/api/order/", { dishes: dishesToOrder });

      console.log(res.data);

      setOrder({ id: res.data.id, total_price: res.data.total_price });

      setIsOrderSuccessful(true);
    } catch (error) {
      console.error("Failed to add to Order:", error);
      alert("Error adding items to Order. Please try log in.");
      nav("/signin")
    }
  };

  const closePaymentPopUp = () => {
    setIsOrderSuccessful(false);
  };

  return (
    <div>
      <Button onClick={addToOrder}>Pay your order now</Button>

      {isOrderSuccessful && order && (
        <PaymentPopUpForm
          isOpen={isOrderSuccessful}
          onClose={closePaymentPopUp}
          order={order}
          dishDetails={dishDetails} // ✅ Correctly pass dishDetails to PaymentPopUpForm
        />
      )}
    </div>
  );
}

export default OrderButton;
