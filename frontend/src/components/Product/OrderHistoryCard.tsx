import React, { useState } from "react";
import { Card } from "@/components/ui/card";
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
    customer: string;
    status: string;
    total_price: number;
    created_at: string;
    ordered_items: OrderedItem[];
  };
  payments: Payment[];
}

const OrderHistoryCard: React.FC<OrderProps> = ({ order, payments }) => {
  const [isOpen, setIsOpen] = useState(payments.length === 0); // Open popup if no payments
  const orderPayments = payments.filter((payment) => payment.order === order.id);
  const firstDish = order.ordered_items[0];

  // Extract dish details from ordered items
  const dishDetails = order.ordered_items.map((item) => ({
    name: item.dish_name,
    price: item.subtotal / item.quantity,
    quantity: item.quantity,
  }));

  return (
    <Card className="w-full shadow-md rounded-lg p-4 flex items-center gap-6">
      {firstDish?.image ? (
        <img
          src={firstDish.image}
          alt={firstDish.dish_name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="flex flex-col items-start gap-1 text-sm w-full">
        <p className="text-gray-500 text-xs">
          Order ID: <span className="font-medium">{order.id}</span>
        </p>
        <p className="font-semibold">
          Status: <span className="text-blue-600">{order.status}</span>
        </p>
        <p className="font-bold text-start">Ordered Items: {order.ordered_items.map((item) => item.dish_name).join(", ")}</p>
        <p className="font-semibold text-gray-600">
          Total Price: <span className="text-green-600">${order.total_price.toFixed(2)}</span>
        </p>
        <p className="text-gray-500">
          Created At: {new Date(order.created_at).toLocaleString()}
        </p>

        {orderPayments.length > 0 ? (
          <p className="text-gray-600">
            Payment Method:{" "}
            <span className="font-medium">
              {orderPayments[0].payment_method ?? "N/A"}
            </span>
          </p>
        ) : (
          <div>
            <button
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
              onClick={() => setIsOpen(true)}>Pay unPaid Order</button>
            <PaymentPopUpForm
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              order={order} // ✅ Pass created order
              dishDetails={dishDetails} // ✅ Pass extracted dish details
            />
          </div>
        )}
        <div className="flex ">
          <div className="mt-2 flex">
            {firstDish && <AddReview dishId={firstDish.dishId} />}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <OrderDelButton OrderId={order.id} />
        </div>
        
      </div>
    </Card>
  );
};

export default OrderHistoryCard;
