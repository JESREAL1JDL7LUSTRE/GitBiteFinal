import { motion, AnimatePresence } from "framer-motion";
import OrderHistoryCard from "@/components/Cards/OrderHistoryCard";
import { Loader2 } from "lucide-react";
import useQueryPayment from "@/utils/Hooks/Tanstack/Payment/useQueryPayment";
import useQueryOrder from "@/utils/Hooks/Tanstack/Order/useQueryOrder";

const PreviousOrders = () => {
  const { useFetchPayment } = useQueryPayment();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQueryOrder();
  const { data: payments, isLoading: paymentsLoading, error: paymentsError } = useFetchPayment();

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
  
  if (ordersError) return <p>{ordersError.message}</p>;
  if (paymentsError) return <p>{paymentsError.message}</p>;
  const sortedOrders = [...(orders || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
                <OrderHistoryCard order={order} payments={payments || []} />
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
