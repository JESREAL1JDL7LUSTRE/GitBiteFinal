import { Dish } from "../utils/useFetchDishes"; // Import the Dish type
import useFetchDishes from "../utils/useFetchDishes"; // Import the custom hook
import CartButton from "./DifferentButtons/CartButton";
import OrderButton from "./DifferentButtons/OrderButton";

const ContentItems = () => {
  const { dishes, loading, error } = useFetchDishes(); // Use the custom hook

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-yellow-300">
      <h2>Dish List</h2>
      <div className="bg-slate-50 border-2 border-red-600 gap-4">
        <ul>
          <div className="bg-green-300 gap-y-10 w-full md:flex">
            {dishes.length > 0 ? (
              dishes.map((item: Dish) => (
                <div key={item.id} className="border-4 gap-y-10 w-full md:w-1/2">
                  <li>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Recipes: {item.recipes}</p>
                    <p>Category: {item.category_name}</p> {/* Use category_name instead */}
                    <p>Available: {item.available ? "Yes" : "No"}</p>
                    {item.image && <img src={item.image} alt={item.name} width="100" />}
                    <CartButton dishId={item.id} />
                    <OrderButton dishId={item.id} />
                  </li>
                </div>
              ))
            ) : (
              <p>No dishes available</p>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ContentItems;
