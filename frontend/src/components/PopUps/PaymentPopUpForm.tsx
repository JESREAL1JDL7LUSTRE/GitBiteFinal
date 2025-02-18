import React, { useState, useEffect } from "react";
import api from "../../api/api";
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
    dishDetails: { name: string; price: number }[]; // ✅ Accept dish details
  }
  
  function PaymentPopUpForm({ isOpen, onClose, order, dishDetails }: PaymentPopUpFormProps) {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [paymentMethods, setPaymentMethods] = useState<{ value: string; label: string }[]>([]);
  
    useEffect(() => {
      const fetchPaymentMethods = async () => {
        try {
          const res = await api.get("/api/payment-methods/");
          if (res.data.payment_methods && Array.isArray(res.data.payment_methods)) {
            setPaymentMethods(
              res.data.payment_methods.map(([value, label]: [string, string]) => ({ value, label }))
            );
          } else {
            alert("Unexpected data format for payment methods.");
          }
        } catch (error) {
          console.error("Failed to load payment methods:", error);
          alert("Failed to load payment methods.");
        }
      };
  
      fetchPaymentMethods();
    }, []);
  
    const PayOrder = async (): Promise<void> => {
      setLoading(true);
      try {
        await api.post("/api/payment/", {
          order: order.id,
          payment_method: paymentMethod,
          amount: order.total_price,
        });
        setLoading(false);
        onClose(); // Close the dialog after payment
      } catch (error) {
        console.error("Payment failed:", error);
        setLoading(false);
        alert("Payment failed.");
      }
    };
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Form</AlertDialogTitle>
            <AlertDialogDescription>
              Pay for your food order
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          {/* ✅ Show dish name, quantity, and total price per dish */}
          <div>
            <h3 className="font-semibold">Your Order:</h3>
            {dishDetails.map((dish, index) => (
              <div key={index} className="mb-2">
                <p>{dish.name} - Price: ${dish.price}</p>
              </div>
            ))}
          </div>
  
          <div>
            <label>
              Select Payment Method:
              {paymentMethods.length === 0 ? (
                <p>Loading payment methods...</p>
              ) : (
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={loading}
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
  
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
  
            <Button onClick={PayOrder} disabled={loading || !paymentMethod}> 
              {loading ? "Processing..." : "Pay"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  export default PaymentPopUpForm;
  