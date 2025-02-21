import { useEffect, useState } from "react";
import api from "../api/api";

interface OrderedItem {
  id: number;
  dish_name: string;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: number;
  customer: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  ordered_items: OrderedItem[];
}

interface PaymentItem {
  id: number;
  order: number;
  payment_method: string;
  transaction_id: string;
  amount: number;
}

const PreviousOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdersAndPayments = async () => {
      try {
        const orderRes = await api.get<Order[]>("/api/order/");
        const paymentRes = await api.get<PaymentItem[]>("/api/payment/");
        setOrders(orderRes.data);
        setPayments(paymentRes.data);
      } catch (err) {
        setError("Failed to fetch orders or payments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndPayments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Previous Orders</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Customer ID: {order.customer}</p>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.total_price}</p>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>

              <h4>Ordered Items:</h4>
              <ul>
                {order.ordered_items.length > 0 ? (
                  order.ordered_items.map((item) => (
                    <li key={item.id}>
                      <p>{item.quantity} x {item.dish_name} - ${item.subtotal}</p>
                    </li>
                  ))
                ) : (
                  <p>No items ordered.</p>
                )}
              </ul>

              <h4>Payment Details:</h4>
              {payments.some((payment) => payment.order === order.id) ? (
                payments
                  .filter((payment) => payment.order === order.id)
                  .map((payment) => (
                    <div key={payment.id}>
                      <p>Payment Method: {payment.payment_method ?? "N/A"}</p>
                      <p>Transaction ID: {payment.transaction_id ?? "N/A"}</p>
                      <p>Amount: ${payment.amount.toFixed(2)}</p>
                    </div>
                  ))
              ) : (
                <p>No payment records found.</p>
              )}
            </li>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </ul>
    </div>
  );
};

export default PreviousOrders;
