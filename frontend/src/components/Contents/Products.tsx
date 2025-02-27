
import { Dish } from "../../utils/Hooks/FetchHooks/useFetchDishes";
import useFetchDishes from "../../utils/Hooks/FetchHooks/useFetchDishes";
import ProductCard from "../Product/ProductCard";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Products = ({ searchQuery = "" }: { searchQuery: string }) => {
  const { dishes, loading, error } = useFetchDishes();
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const safeSearchQuery = typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

  const filteredDishes = safeSearchQuery
    ? (Array.isArray(dishes) ? dishes.filter((dish: Dish) => {
        return (
          (dish.name ? dish.name.toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.recipes ? dish.recipes.toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.category_name ? dish.category_name.toString().toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.price ? dish.price.toString().includes(safeSearchQuery) : false)
        );
      }) : [] )
    : dishes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center mx-3">
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
