import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/Cards/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useFetchDish2 from "@/utils/Hooks/FetchHooks/useFetchDish2";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get page number from URL, default to 1
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  const { dishes, loading, error, totalPages } = useFetchDish2(page, searchQuery);
  const filteredDishes = Array.isArray(dishes) ? dishes : [];

  useEffect(() => {
    // Ensure the page number in URL is valid
    if (page < 1) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, [page, setSearchParams]);

  useEffect(() => {
    // Scroll to top when the page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#a0c878] border-t-transparent rounded-full mb-4"
        />
        <p className="text-[#a0c878] font-medium">Loading menu items...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-4"
      id="menu-section"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-6 text-gray-800"
      >
        Our <span className="text-[#a0c878]">Menu</span>
      </motion.h2>

      {/* Dishes Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => navigate(`/product/${dish.id}`)}
            >
              <ProductCard dish={dish} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <p className="text-gray-500 text-lg">No dishes found matching your search criteria</p>
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="mt-4 px-4 py-2 bg-[#a0c878] text-white rounded-md hover:bg-[#8fb86a] transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Pagination className="flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setSearchParams({ page: String(page - 1) });
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`?page=${index + 1}`}
                    isActive={page === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchParams({ page: String(index + 1) });
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setSearchParams({ page: String(page + 1) });
                  }}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;
