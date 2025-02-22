import React from "react";
import useFetchOrders from "../utils/useFetchOrders";

const Order = () => {
  const { orders, loading, error } = useFetchOrders();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Order List</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Customer ID: {order.customer}</p>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.total_price.toFixed(2)}</p>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>

              {/* Ordered Items */}
              <h4>Ordered Items:</h4>
              <ul>
                {order.ordered_items.length > 0 ? (
                  order.ordered_items.map((item) => (
                    <li key={item.id}>
                      <p>
                        {item.quantity} x {item.dish_name} - $
                        {item.subtotal.toFixed(2)}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No items ordered.</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Order;
