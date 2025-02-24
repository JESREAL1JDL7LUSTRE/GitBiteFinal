import React, { useState } from "react";
import useFetchPaymentMethods from "../../utils/Hooks/FetchHooks/useFetchPaymentMethod";
import usePostPayment from "../../utils/Hooks/PostHooks/usePostPayment"; // ✅ Import new hook
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface PaymentPopUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  order: { id: number; total_price: number };
  dishDetails: { name: string; price: number; quantity: number}[];
}

function PaymentPopUpForm({ isOpen, onClose, order, dishDetails }: PaymentPopUpFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { paymentMethods, loading: methodsLoading, error: fetchError } = useFetchPaymentMethods();
  const { postPayment, loading: postLoading, error: postError } = usePostPayment(); // ✅ Use new hook

  const handlePayment = async () => {
    await postPayment({
      order: order.id,
      payment_method: paymentMethod,
      amount: order.total_price,
    });

    if (!postError) onClose(); // Close modal on success
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Payment Form</AlertDialogTitle>
          <AlertDialogDescription>Pay for your food order</AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <h3 className="font-semibold">Your Order:</h3>
          {dishDetails.map((dish, index) => (
            <div key={index} className="mb-2">
              <p>{dish.name} - Price: ${dish.price.toFixed(2)} Quantity: {dish.quantity}</p>
            </div>
          ))}
        </div>

        <div>
          <label>
            Select Payment Method:
            {methodsLoading ? (
              <p>Loading payment methods...</p>
            ) : fetchError ? (
              <p className="text-red-500">{fetchError}</p>
            ) : (
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={postLoading}
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>

        {postError && <p className="text-red-500">{postError}</p>} {/* ✅ Show payment errors */}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button onClick={handlePayment} disabled={postLoading || !paymentMethod}>
            {postLoading ? "Processing..." : "Pay"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymentPopUpForm;
