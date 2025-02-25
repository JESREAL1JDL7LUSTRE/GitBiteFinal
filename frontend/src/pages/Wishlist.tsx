import useFetchCart, { CartItem } from "../utils/Hooks/FetchHooks/useFetchWishlist";
import usePostCart from "../utils/Hooks/PostHooks/usePostCart";
import OrderButton from "@/components/Buttons/OrderButton";

const Wishlist = () => {
  const { cart, loading, error } = useFetchCart(); // Fetch wishlist items
  const { updateDishQuantity } = usePostCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <li key={item.id} className="border p-4 rounded-md shadow-md mb-4">
              <h3 className="text-lg font-semibold">{item.dish.name}</h3>
              <p className="text-gray-600">{item.dish.description}</p>
              <p className="text-gray-500">Price: {item.dish.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="bg-red-500 px-2 py-1 rounded"
                  onClick={() => updateDishQuantity(item.dish.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <p className="text-md">{item.quantity}</p>
                <button
                  className="bg-green-500 px-2 py-1 rounded"
                  onClick={() => updateDishQuantity(item.dish.id, 1)}
                >
                  +
                </button>
              </div>

              <button onClick={(e) => e.stopPropagation()} className="mt-3">
                <OrderButton
                  dishDetails={[
                    {
                      id: item.dish.id,
                      name: item.dish.name,
                      price: item.dish.price,
                      quantity: item.quantity,
                    },
                  ]}
                />
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No items in the wishlist</p>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;
