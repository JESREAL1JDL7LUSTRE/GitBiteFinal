import { Dish } from "../utils/useFetchDishes";
import useFetchDishes from "../utils/useFetchDishes";
import CartButton from "./DifferentButtons/CartButton";
import PlanToOrderButton from "./DifferentButtons/PlanToOrderButton";

interface ContentItemsProps {
  searchQuery: string;
}

const ContentItems = ({ searchQuery }: ContentItemsProps) => {
  const { dishes, loading, error } = useFetchDishes();

  // Filter dishes based on search query
  const filteredDishes = searchQuery.trim()
    ? (Array.isArray(dishes) ? dishes.filter((dish: Dish) => {
        return (
          (dish.name ? dish.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
          (dish.recipes ? dish.recipes.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
          (dish.category_name ? dish.category_name.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
          (dish.price ? dish.price.toString().includes(searchQuery) : false)
        );
      }) : [])
    : dishes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-yellow-300">
      <h2>Dish List</h2>
      <div className="bg-slate-50 border-2 border-red-600 gap-4">
        <ul>
          <div className="bg-green-300 gap-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((item: Dish) => (
                <div key={item.id} className="border-4 gap-y-10 p-4">
                  <li>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Recipes: {item.recipes}</p>
                    <p>Category: {item.category_name}</p>
                    <p>Available: {item.available ? "Yes" : "No"}</p>
                    <p>Price: ${item.price}</p>
                    <div className="flex justify-center">
                      {item.image && <img src={item.image} alt={item.name} className="size-60" />}
                    </div>
                    <CartButton dishId={item.id} />
                    <PlanToOrderButton dish={item} />
                  </li>
                </div>
              ))
            ) : (
              <p>No dishes found</p>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ContentItems;
