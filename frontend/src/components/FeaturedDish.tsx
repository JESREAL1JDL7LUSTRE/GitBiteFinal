import useFetchDishes, { Dish } from "../utils/useFetchDishes";

function FeaturedDish() {
  const { dishes, loading, error } = useFetchDishes();
  const featuredDishes = dishes.filter((dish) => dish.featured);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-yellow-300">
      <h2>Featured Dishes</h2>
      <div className="bg-slate-50 border-2 border-red-600 gap-4">
        <ul>
          <div className="bg-green-300 gap-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {featuredDishes.length > 0 ? (
              featuredDishes.map((item: Dish) => (
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
                  </li>
                </div>
              ))
            ) : (
              <p>No featured dishes found</p>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default FeaturedDish;
