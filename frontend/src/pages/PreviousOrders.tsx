import React from "react";
import useFetchOrders from "../utils/Hooks/FetchHooks/useFetchOrders";
import useFetchPayments from "../utils/Hooks/FetchHooks/useFetchPayments";
import OrderHistoryCard from "@/components/Product/OrderHistoryCard";


const PreviousOrders = () => {
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { payments, loading: paymentsLoading, error: paymentsError } = useFetchPayments();

  if (ordersLoading || paymentsLoading) return <p>Loading orders and payments...</p>;
  if (ordersError) return <p>{ordersError}</p>;
  if (paymentsError) return <p>{paymentsError}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderHistoryCard key={order.id} order={order} payments={payments} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders available</p>
      )}
    </div>
  );
};

export default PreviousOrders;
