import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddReview from "@/components/Reviews/AddReview";
import PaymentPopUpForm from "../PopUps/PaymentPopUpForm";
import OrderDelButton from "../Buttons/DeleteButtons/OrderDelButton";

interface OrderedItem {
  id: number;
  dish_name: string;
  quantity: number;
  subtotal: number;
  dishId: number;
  image?: string;
}

interface Payment {
  id: number;
  order: number;
  payment_method: string | null;
  transaction_id: string | null;
  amount: number;
}

interface OrderProps {
  order: {
    id: number;
    customer: number;
    status: string;
    total_price: number;
    created_at: string;
    ordered_items: OrderedItem[];
  };
  payments: Payment[];
}

const OrderHistoryCard: React.FC<OrderProps> = ({ order, payments }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const orderPayments = payments.filter((payment) => payment.order === order.id);
  const [isPayOpen, setIsPayOpen] = useState(payments.length === 0);

  const dishDetails = order.ordered_items.map((item) => ({
    name: item.dish_name,
    price: item.subtotal / item.quantity,
    quantity: item.quantity,
  }));

  return (
    <Card className="w-2/2  mx-auto shadow-md rounded-lg p-5 border bg-white">
      {/* Order Summary Header */}
      <div className="flex justify-between items-center border-b pb-4 gap-6">
  {/* Order Number */}
        <div>
          <p className="text-gray-500 text-sm">Order Number</p>
          <p className="font-medium text-lg">{order.id}</p>
        </div>

        {/* Date Placed */}
        <div>
          <p className="text-gray-500 text-sm">Date Placed</p>
          <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
        </div>

        {/* Payment Method */}
        <div>
          <p className="text-gray-500 text-sm">Payment Method</p>
          <p className="font-medium">{orderPayments[0]?.payment_method ?? "N/A"}</p>
        </div>

        {/* Total Amount */}
        <div>
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="font-semibold text-lg">${order.total_price.toFixed(2)}</p>
        </div>

        {/* Buttons: Expand Order Details & Payment Popup */}
        <div className="flex items-center gap-3">
        {orderPayments?.length > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded2(!isExpanded2)}
              className="flex items-center"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Hide Payment Details" : "View Payment Details"}
              {isExpanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
            </Button>
          ) : (
            <Button 
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
              onClick={() => setIsPayOpen(true)}
            >
              Pay Unpaid Order
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center"
          >
            {isExpanded ? "Hide Order Details" : "View Order Details"}
            {isExpanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>

          <div className="flex flex-col items-start gap-1">
          <OrderDelButton OrderId={order.id} />
          </div>

          {/* Payment Popup */}

          <PaymentPopUpForm
            isOpen={isPayOpen}
            onClose={() => setIsPayOpen(false)}
            order={order}
            dishDetails={dishDetails}
          />
        </div>
      </div>
      
      {/* Collapsible Order Items List */}
      {isExpanded2 && (
        <div className="mt-4">
              {payments
            .filter((payment) => payment.order === order.id) // Filter payments for this order
            .map((payment) => (
            <div key={payment.id} className="flex items-start gap-4 border-b py-4">
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">Payment ID: {payment.id}</h3>
                  <p className="text-gray-600 text-sm">Amount: ${payment.amount.toFixed(2)}</p>
                </div>

                <p className="text-md">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {payment.payment_method ? payment.payment_method : "Not Provided"}
                </p>

                <p className="text-md">
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  {payment.transaction_id ? payment.transaction_id : "N/A"}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <h1 className="text-blue-500 text-md font-semibold">Order Status:</h1>
                    <p>{order.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {isExpanded && (
        <div className="mt-4">
          {order.ordered_items.map((item) => (
            console.log(item),
            <div key={item.id} className="flex items-start gap-4 border-b py-4">
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.dish_name}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{item.dish_name}</h3>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}x</p>
                </div>
                <p className="text-lg font-bold flex justify-start">${item.subtotal.toFixed(2)}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <h1 className="text-blue-500 text-md font-semibold">Status:</h1>
                    {order.status}
                  </div>
                  <AddReview dishId={item.dishId} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      )}
    </Card>
  );
};

export default OrderHistoryCard;
