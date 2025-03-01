import React from "react";
import useFetchOrders from "../utils/Hooks/FetchHooks/useFetchOrders";
import useFetchPayments from "../utils/Hooks/FetchHooks/useFetchPayments";
import OrderHistoryCard from "@/components/Cards/OrderHistoryCard";


const PreviousOrders = () => {
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { payments, loading: paymentsLoading, error: paymentsError } = useFetchPayments();

  if (ordersLoading || paymentsLoading) return <p>Loading orders and payments...</p>;
  if (ordersError) return <p>{ordersError}</p>;
  if (paymentsError) return <p>{paymentsError}</p>;

  // ✅ Sort orders from newest to oldest based on `created_at`
  const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="bg-gray-50 p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {sortedOrders.length > 0 ? (
        <div className="grid gap-4">
          {sortedOrders.map((order) => (
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
