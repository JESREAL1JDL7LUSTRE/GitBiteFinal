import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useFetchCart, { CartItem } from "../utils/Hooks/FetchHooks/useFetchWishlist";
import WishlistCard from "@/components/Product/WishlistCard"; // Import the WishlistCard component

const Wishlist = () => {
  const { cart, loading, error } = useFetchCart(); // Fetch wishlist items
  const navigate = useNavigate(); // Initialize useNavigate

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => navigate(`/product/${item.dish.id}`)} // Navigate to product details
            >
              <WishlistCard
                dish={{
                  id: item.dish.id,
                  name: item.dish.name,
                  category_name: item.dish.category,
                  price: item.dish.price,
                  image: item.dish.image,
                  description: item.dish.description,
                  available: item.dish.available,
                }}
                cartId={item.id}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in the wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
