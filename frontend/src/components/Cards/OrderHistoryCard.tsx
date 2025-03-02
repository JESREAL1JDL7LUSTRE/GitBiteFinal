import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CreditCard, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
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

  const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-5/6 mx-auto overflow-hidden rounded-xl shadow-sm border border-green-100 bg-white transition-all duration-300 hover:shadow-md"
    >
      <div className="bg-[#a0c878] p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-bold">Order #{order.id}</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Date Placed</span>
            <div className="flex justify-center items-center mt-1 text-gray-700 ">
              <Clock className="w-4 h-4 mr-1 text-green-600 " />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Payment Method</span>
            <div className="flex items-center mt-1 text-gray-700 justify-center">
              <CreditCard className="w-4 h-4 mr-1 text-green-600" />
              <span>{orderPayments[0]?.payment_method ?? "Not Paid"}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Items</span>
            <div className="flex items-center mt-1 text-gray-700 justify-center">
              <ShoppingBag className="w-4 h-4 mr-1 text-green-600" />
              <span>{order.ordered_items.length} items</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Amount</span>
            <div className="flex items-center mt-1 font-bold justify-center">
              ${order.total_price.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
          {orderPayments?.length > 0 ? (
            <button
              onClick={() => setIsExpanded2(!isExpanded2)}
              className="flex items-center px-3 py-2 text-sm text-black rounded-lg border shadow-sm"
            >
              {isExpanded2 ? "Hide Payment Details" : "View Payment Details"}
              {isExpanded2 ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
            </button>
          ) : (
            <button
              className="flex items-center px-3 py-2 text-sm bg-black text-white rounded-md hover:bg-[#a0c878] transition-colors"
              onClick={() => setIsPayOpen(true)}
            >
              Pay Now
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-3 py-2 text-sm text-black rounded-lg border shadow-sm"
          >
            {isExpanded ? "Hide Order Details" : "View Order Details"}
            {isExpanded ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>

          <div className="ml-auto">
            <OrderDelButton OrderId={order.id} />
          </div>

          <PaymentPopUpForm
            isOpen={isPayOpen}
            onClose={() => setIsPayOpen(false)}
            order={order}
            dishDetails={dishDetails}
          />
        </div>
      </div>

      {isExpanded2 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bg-green-50 p-5 border-t border-green-100"
        >
          <h4 className="font-medium text-green-800 mb-3">Payment Information</h4>
          {payments
            .filter((payment) => payment.order === order.id)
            .map((payment) => (
              <div key={payment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Payment ID</span>
                  <span className="font-small">{payment.id}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Method</span>
                  <span className="font-small">{payment.payment_method || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Transaction ID</span>
                  <span className="font-small">{payment.transaction_id || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-bold">${payment.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
        </motion.div>
      )}

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="border-t border-green-100"
        >
          <h4 className="font-medium text-green-800 p-4 bg-green-50">Ordered Items</h4>
          <div className="divide-y divide-gray-10">
            {order.ordered_items.map((item) => (
              <div key={item.id} className="p-3 px-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.dish_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{item.dish_name}</h3>
                      <div className=" font-bold">${item.subtotal.toFixed(2)}</div>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      Quantity: {item.quantity}x
                      <AddReview dishId={item.dishId} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderHistoryCard;
