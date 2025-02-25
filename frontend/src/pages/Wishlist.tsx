import StarRatingShow from "@/components/Reviews/StarRatingShow";
import useFetchCart, { CartItem } from "../utils/Hooks/FetchHooks/useFetchWishlist";
import useFetchReviews from "../utils/Hooks/FetchHooks/useFetchReviews";
import OrderButton from "@/components/Buttons/OrderButton";

const Wishlist = () => {
  const { cart, loading, error } = useFetchCart(); // Fetch wishlist items
  const { reviews } = useFetchReviews();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item: CartItem) => {

            const dishReviews = reviews?.filter((review) => Number(review.dish) === Number(item.dish.id)) || [];

            // Calculate average rating
            const averageRating =
              dishReviews.length > 0
                ? dishReviews.reduce((sum, review) => sum + review.rating, 0) / dishReviews.length
                : 0;

            return (
              <li key={item.id} className="border p-4 rounded-md shadow-md mb-4">
                <h3 className="text-lg font-semibold">{item.dish.name}</h3>
                <p className="text-gray-600">{item.dish.description}</p>
                <p className="text-gray-500">Recipes: {item.dish.recipes}</p>
                <p className="text-gray-500">Category: {item.dish.category}</p>
                <p className="text-gray-500">Available: {item.dish.available ? "Yes" : "No"}</p>
                <p className="text-gray-500">Price: {item.dish.price}</p>
                <p className="text-gray-700 font-medium">Quantity: {item.quantity}</p>

                {item.dish.image && (
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    width="100"
                    className="rounded-md mt-2"
                  />
                )}

                <div className="mt-2">
                  <StarRatingShow rating={averageRating || 0} />
                </div>

                <button onClick={(e) => e.stopPropagation()} className="mt-3">
                  <OrderButton dishDetails={[{
                    id: item.dish.id,
                    name: item.dish.name,
                    price: item.dish.price,
                    quantity: item.quantity
                  }]} />
                </button>
              </li>
            );
          })
        ) : (
          <p className="text-gray-500">No items in the wishlist</p>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;
