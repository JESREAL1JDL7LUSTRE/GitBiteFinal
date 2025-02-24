import { Dish } from "../../utils/Hooks/FetchHooks/useFetchDishes";
import useFetchDishes from "../../utils/Hooks/FetchHooks/useFetchDishes";
import ProductCard from "../Product/ProductCard";

const Products = ({ searchQuery = "" }: { searchQuery: string }) => {
  const { dishes, loading, error } = useFetchDishes();

  const safeSearchQuery = typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

  const filteredDishes = safeSearchQuery
    ? (Array.isArray(dishes) ? dishes.filter((dish: Dish) => {
        return (
          (dish.name ? dish.name.toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.recipes ? dish.recipes.toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.category_name ? dish.category_name.toString().toLowerCase().includes(safeSearchQuery) : false) ||
          (dish.price ? dish.price.toString().includes(safeSearchQuery) : false)
        );
      }) : [])
    : dishes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center">
        <div className="grid grid-cols-auto-fit gap-6 w-full">
            {filteredDishes.length > 0 ? (
            filteredDishes.map((dish: Dish) => (
                <div key={dish.id} className="p-6">
                <ProductCard dish={dish} />
                </div>
                
            ))
            ) : (
            <p>No dishes found</p>
            )}
        </div>
    </div>
  );
};

export default Products;
