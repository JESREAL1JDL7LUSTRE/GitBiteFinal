
import useFetchCart, { CartItem } from "../utils/useFetchCart"; // Import the custom hook

const Cart = () => {
  const { cart, loading, error } = useFetchCart(); // Use the custom hook

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <li key={item.id}>
              <h3>{item.dish.name}</h3>
              <p>{item.dish.description}</p>
              <p>Recipes: {item.dish.recipes}</p>
              <p>Category: {item.dish.category}</p>
              <p>Available: {item.dish.available ? "Yes" : "No"}</p>
              <p>Quantity: {item.quantity}</p>
              {item.dish.image && (
                <img src={item.dish.image} alt={item.dish.name} width="100" />
              )}
            </li>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
