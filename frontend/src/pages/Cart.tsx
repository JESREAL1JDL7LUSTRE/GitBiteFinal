import { useEffect, useState } from "react";
import api from "../api/api";

interface CartItem {
  id: number;
  name: string;
  description: string;
  recipes: number;
  category: string;
  available: boolean;
  image?: string; // Optional
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // Correctly typed state

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await api.get<CartItem[]>("/api/cart/"); // Ensure correct response type
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
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Recipes: {item.recipes}</p>
              <p>Category: {item.category}</p>
              <p>Available: {item.available ? "Yes" : "No"}</p>
              {item.image && <img src={item.image} alt={item.name} width="100" />}
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
