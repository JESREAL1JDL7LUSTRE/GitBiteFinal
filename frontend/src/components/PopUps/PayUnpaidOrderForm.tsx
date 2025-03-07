import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useQueryPayment from "@/utils/Hooks/Tanstack/Payment/useQueryPayment";
import useMutationPayment from "@/utils/Hooks/Tanstack/Payment/useMutationPayment";


interface DishDetails {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface PayUnpaidOrderFormProps {
  order: { id: number; total_price: number };
  dishDetails: DishDetails[];
  isOpen: boolean;
  onClose: () => void;
}

function PayUnpaidOrderForm({ order, dishDetails, isOpen, onClose }: PayUnpaidOrderFormProps) {
  const {useFetchPaymentMethods} = useQueryPayment();
  const useMutationPaymentPost = useMutationPayment();
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { mutate: postPayment, isPending: postLoading, error: postError } = useMutationPaymentPost();
  const { data: paymentMethods, isLoading: methodsLoading, error: fetchError } = useFetchPaymentMethods();
  const nav = useNavigate();

  const handlePayment = async () => {
    try {
      await postPayment({
        order: order.id,
        payment_method: paymentMethod,
        amount: parseFloat(order.total_price.toFixed(2)),
      });
      onClose();
      nav(0);
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-gray-800 text-center">
            Confirm Payment
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-center">
            Complete your payment for the order
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Your Order:</h3>
          <div className="max-h-60 overflow-y-auto p-1 border rounded-md">
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
            <p className="text-red-500">{fetchError.message}</p>
          ) : (
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={postLoading}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {paymentMethods?.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {postError && <p className="text-red-500 mt-3">{postError.message}</p>}

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

export default PayUnpaidOrderForm;