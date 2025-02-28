
import useFetchPayments, { PaymentItem } from "../utils/Hooks/FetchHooks/useFetchPayments"; // Import the custom hook

const PreviousPayment = () => {
  const { payments, loading, error } = useFetchPayments(); // Use the custom hook

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Previous Payment List</h2>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment: PaymentItem) => (
            <li key={payment.id}>
              <p>Order ID: {payment.order ?? "N/A"}</p>
              <p>Payment Method: {payment.payment_method ?? "N/A"}</p>
              <p>Transaction ID: {payment.transaction_id ?? "N/A"}</p>
              <p>Amount: ${payment.amount ? payment.amount.toFixed(2) : "N/A"}</p>
            </li>
          ))
        ) : (
          <p>No payment records found</p>
        )}
      </ul>
    </div>
  );
};

export default PreviousPayment;
