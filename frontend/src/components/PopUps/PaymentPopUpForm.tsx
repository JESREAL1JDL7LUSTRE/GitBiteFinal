import React, { useState } from "react";
import useFetchPaymentMethods from "../../utils/Hooks/FetchHooks/useFetchPaymentMethod";
import usePostPayment from "../../utils/Hooks/PostHooks/usePostPayment";
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
  dishDetails: { name: string; price: number; quantity: number }[];
}

function PaymentPopUpForm({ isOpen, onClose, order, dishDetails }: PaymentPopUpFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { paymentMethods, loading: methodsLoading, error: fetchError } = useFetchPaymentMethods();
  const { postPayment, loading: postLoading, error: postError } = usePostPayment();

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
      <AlertDialogContent className="p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-gray-800 text-center">Confirm Payment</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-center">
            Complete your payment for the order
          </AlertDialogDescription>
        </AlertDialogHeader>

          <div className="mt-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Your Order:</h3>
            <div className=" max-h-60 overflow-y-auto p-1 border rounded-md">
              {dishDetails.map((dish, index) => (
                <div key={index} className="mb-4 p-3 border rounded-md shadow-sm bg-gray-50">
                  <p className="font-bold">
                    {dish.name} - <span className="font-medium">${dish.price.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-600">Quantity: {dish.quantity || 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Select Payment Method:</label>
            {methodsLoading ? (
              <p className="text-gray-500">Loading payment methods...</p>
            ) : fetchError ? (
              <p className="text-red-500">{fetchError}</p>
            ) : (
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={postLoading}
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            )}
          </div>

        {postError && <p className="text-red-500 mt-3">{postError}</p>}

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel onClick={onClose} className="border rounded-md px-4 py-2 text-gray-700">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handlePayment}
            disabled={postLoading || !paymentMethod}
            className="bg-green-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {postLoading ? "Processing..." : "Pay"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymentPopUpForm;
