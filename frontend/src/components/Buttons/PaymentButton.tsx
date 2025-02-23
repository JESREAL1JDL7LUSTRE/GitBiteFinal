import React, { useState } from "react";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import { Button } from "../ui/button";

interface PaymentButtonProps {
  order: { id: number; total_price: number };
  dishDetails: { id: number; name: string; price: number }[];
}

function PaymentButton({ order, dishDetails }: PaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Buy Now</Button>

      {/* Payment Pop-Up Form */}
      {isOpen && (
        <PaymentPopUpForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          order={order}
          dishDetails={dishDetails}
        />
      )}
    </div>
  );
}

export default PaymentButton;
