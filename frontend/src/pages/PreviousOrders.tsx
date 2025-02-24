import useFetchPayments from "../utils/Hooks/FetchHooks/useFetchPayments"; // Import the custom hook
import useFetchOrders from "../utils/Hooks/FetchHooks/useFetchOrders";
import AddReview from "@/components/Reviews/AddReview";

const PreviousOrders = () => {
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { payments, loading: paymentsLoading, error: paymentsError } = useFetchPayments();

  if (ordersLoading || paymentsLoading) return <p>Loading orders and payments...</p>;
  if (ordersError) return <p>{ordersError}</p>;
  if (paymentsError) return <p>{paymentsError}</p>;

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
              <p>Total Price: ${order.total_price.toFixed(2)}</p>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>

              <h4>Ordered Items:</h4>
              <ul>
                {order.ordered_items.length > 0 ? (
                  order.ordered_items.map((item) => (
                    <li key={item.id}>
                      <p>{item.quantity} x {item.dish_name} - ${item.subtotal.toFixed(2)}</p>
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
              <AddReview />
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
