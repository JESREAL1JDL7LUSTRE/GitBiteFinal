import React from "react";
import { Card } from "@/components/ui/card";
import AddReview from "@/components/Reviews/AddReview";

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
  const orderPayments = payments.filter((payment) => payment.order === order.id);
  const firstDish = order.ordered_items[0]; // ✅ Get first dish (if available)

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
        <p className="font-semibold">
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
          <p className="text-gray-500">No payment records found.</p>
        )}

        <div className="mt-2">
          {firstDish && <AddReview dishId={firstDish.dishId} />}
        </div>
      </div>
    </Card>
  );
};

export default OrderHistoryCard;
