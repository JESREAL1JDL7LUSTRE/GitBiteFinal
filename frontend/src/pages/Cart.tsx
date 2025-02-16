import { useEffect, useState } from "react";
import api from "../api/api";

interface Dish {
  id: number;
  name: string;
  description: string;
  recipes: number;
  category: string;
  available: boolean;
  image?: string;
}

interface CartItem {
  id: number;
  quantity: number;
  dish: Dish; // Now includes full dish details
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const res = await api.get<CartItem[]>("/api/cart/"); // Fetch cart data
      setCart(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch cart items");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item) => (
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
