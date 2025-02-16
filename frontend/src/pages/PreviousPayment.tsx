import { useEffect, useState } from "react";
import api from "../api/api";

interface PaymentItem {
  id: number;
  order: number; // Assuming order is an order ID
  payment_method: string;
  transaction_id: string;
  amount: number;
}

const PreviousPayment = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]); // Correctly typed state

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    try {
      const res = await api.get<PaymentItem[]>("/api/payment/"); // Ensure correct response type
      setPayments(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch payment details");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Previous Payment List</h2>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment) => (
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
