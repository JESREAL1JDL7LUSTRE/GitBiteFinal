import { Dish } from "../../utils/Hooks/FetchHooks/useFetchDishes";
import useFetchDishes from "../../utils/Hooks/FetchHooks/useFetchDishes";
import WishlistButton from "../Buttons/WishlistButton";
import PlanToOrderButton from "../Buttons/CartButton";
import PaymentButton from "../Buttons/PaymentButton";


const ContentItems = ({ searchQuery = "" }: { searchQuery: string }) => {
  const { dishes, loading, error } = useFetchDishes();

  // Ensure searchQuery is always a string
  const safeSearchQuery = typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

  // Filter dishes based on search query
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
                    <PaymentButton dishDetails={[item]} />
                    <WishlistButton dishId={item.id} />
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
