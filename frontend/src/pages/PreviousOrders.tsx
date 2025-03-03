import { motion, AnimatePresence } from "framer-motion";
import useFetchOrders from "../utils/Hooks/FetchHooks/useFetchOrders";
import useFetchPayments from "../utils/Hooks/FetchHooks/useFetchPayments";
import OrderHistoryCard from "@/components/Cards/OrderHistoryCard";
import { Loader2 } from "lucide-react";

const PreviousOrders = () => {
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { payments, loading: paymentsLoading, error: paymentsError } = useFetchPayments();

  if (ordersLoading || paymentsLoading) { return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
    >
        <Loader2 className="h-12 w-12 animate-spin text-[#a0c878]" />
        <p className="ml-2 text-[#a0c878] font-medium">Loading order history...</p>
    </motion.div>
);
}
  
  if (ordersError) return <p>{ordersError}</p>;
  if (paymentsError) return <p>{paymentsError}</p>;

  const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 p-5 min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {sortedOrders.length > 0 ? (
        <AnimatePresence>
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {sortedOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrderHistoryCard order={order} payments={payments} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="text-gray-500">No orders available</p>
      )}
    </motion.div>
  );
};

export default PreviousOrders;
