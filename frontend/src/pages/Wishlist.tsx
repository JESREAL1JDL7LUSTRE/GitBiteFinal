import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useFetchCart, { CartItem } from "../utils/Hooks/FetchHooks/useFetchWishlist";
import WishlistCard from "@/components/Cards/WishlistCard";
import { Loader2 } from "lucide-react";

const Wishlist = () => {
  const { cart, loading, error } = useFetchCart();
  const navigate = useNavigate();

  if (loading) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen"
        >
            <Loader2 className="h-12 w-12 animate-spin text-[#a0c878]" />
            <p className="ml-2 text-[#a0c878] font-medium">Loading wishlist...</p>
        </motion.div>
    );
}
  if (error) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen"
        >
            <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
                <p className="text-red-600 font-medium">{error}</p>
                <button 
                    onClick={() => navigate(-1)} 
                    className="mt-4 px-4 py-2 bg-[#a0c878] hover:bg-[#8fb86a] text-white rounded-md"
                >
                    Go Back
                </button>
            </div>
        </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 p-6 min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {cart.length > 0 ? (
            cart.map((item: CartItem) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
                onClick={() => navigate(`/product/${item.dish.id}`)}
              >
                <WishlistCard
                  dish={{
                    id: item.dish.id,
                    name: item.dish.name,
                    category_name: item.dish.category,
                    price: item.dish.price,
                    image: item.dish.image,
                    description: item.dish.description,
                    available: item.dish.available,
                  }}
                  cartId={item.id}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No items in the wishlist</p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Wishlist;
