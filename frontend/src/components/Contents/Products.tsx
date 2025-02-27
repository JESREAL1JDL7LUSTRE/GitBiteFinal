import { useState } from "react";
import useFetchDishes from "../../utils/Hooks/FetchHooks/useFetchDish2";
import ProductCard from "../Product/ProductCard";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const [page, setPage] = useState(1);
  const { dishes, loading, error, totalPages } = useFetchDishes(page);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center mx-3">
      {filteredDishes.length > 0 ? ( // ✅ Fixed: Use filteredDishes instead of dishes
        filteredDishes.map((dish) => (
          <div 
            key={dish.id} 
            className="p-3 cursor-pointer"
            onClick={() => navigate(`/product/${dish.id}`)} // ✅ Now navigate works
          >
            <ProductCard dish={dish} />
          </div>
        ))
      ) : (
        <p>No dishes found</p>
      )}
    </div>
  );
};

export default Products;
