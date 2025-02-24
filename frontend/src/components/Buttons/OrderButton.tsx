import React, { useState } from "react";
import { Button } from "../ui/button";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import usePostOrder from "../../utils/Hooks/PostHooks/usePostOrder2";

interface DishDetails {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderButtonProps {
  dishDetails: DishDetails[];
}

const OrderButton: React.FC<OrderButtonProps> = ({ dishDetails }) => {
  const { createOrder, order, loading } = usePostOrder();
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  const handleOrder = async () => {
    if (dishDetails.length === 0) return;
    console.log(dishDetails);

    const newOrder = await createOrder(dishDetails);
    if (newOrder) setIsOrderSuccessful(true);
  };

  const closePaymentPopUp = () => setIsOrderSuccessful(false);

  return (
    <div>
      <Button onClick={handleOrder} disabled={loading || dishDetails.length === 0}>
        {loading ? "Processing..." : "Buy Now"}
      </Button>

      {isOrderSuccessful && order && (
        <PaymentPopUpForm
          isOpen={isOrderSuccessful}
          onClose={closePaymentPopUp}
          order={order}
          dishDetails={dishDetails} // ✅ Now correctly includes quantity
        />
      )}
    </div>
  );
};

export default OrderButton;
