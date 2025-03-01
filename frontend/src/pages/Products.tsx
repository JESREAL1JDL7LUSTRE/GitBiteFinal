import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-3" id="menu-section">
      {/* Dishes Grid */}
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-3 cursor-pointer"
              onClick={() => navigate(`/product/${dish.id}`)}
            >
              <ProductCard dish={dish} />
            </div>
          ))
        ) : (
          <p>No dishes found</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-4 flex justify-center">
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
      )}
    </div>
  );
};

export default Products;
