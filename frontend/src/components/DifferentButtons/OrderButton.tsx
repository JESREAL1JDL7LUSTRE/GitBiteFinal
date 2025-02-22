import React, { useState } from "react";
import { Button } from "../ui/button";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import usePostOrder from "../../utils/Hooks/PostHooks/usePostOrder2";

interface OrderButtonProps {
  dishDetails: { id: number; name: string; price: number }[];
}

const OrderButton: React.FC<OrderButtonProps> = ({ dishDetails }) => {
  const { createOrder, order, loading } = usePostOrder();
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  const handleOrder = async () => {
    const newOrder = await createOrder(dishDetails);
    if (newOrder) setIsOrderSuccessful(true);
  };

  const closePaymentPopUp = () => setIsOrderSuccessful(false);

  return (
    <div>
      <Button onClick={handleOrder} disabled={loading}>
        {loading ? "Processing..." : "Pay your order now"}
      </Button>

      {isOrderSuccessful && order && (
        <PaymentPopUpForm
          isOpen={isOrderSuccessful}
          onClose={closePaymentPopUp}
          order={order}
          dishDetails={dishDetails} // ✅ Pass dish details correctly
        />
      )}
    </div>
  );
};

export default OrderButton;
