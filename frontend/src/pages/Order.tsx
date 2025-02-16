import { useEffect, useState } from "react";
import api from "../api/api";
import PaymentButton from "@/components/DifferentButtons/PaymentButton";

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
  ordered_items: OrderedItem[]; // ✅ Add Ordered Items
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const res = await api.get<Order[]>("/api/order/");
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Customer ID: {order.customer}</p>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.total_price}</p>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>

              {/* Display Ordered Items */}
              <h4>Ordered Items:</h4>
              <ul>
                {order.ordered_items.length > 0 ? (
                  order.ordered_items.map((item) => (
                    <li key={item.id}>
                      <p>{item.quantity} x {item.dish_name} - ${item.subtotal}</p>
                      <PaymentButton orderId = {order.id} />
                    </li>
                  ))
                ) : (
                  <p>No items ordered.</p>
                )}
              </ul>
            </li>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </ul>
    </div>
  );
};

export default Order;
