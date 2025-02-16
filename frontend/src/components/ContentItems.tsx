import { useEffect, useState } from "react";
import api from "../api/api";
import CartButton from "./DifferentButtons/CartButton";
import OrderButton from "./DifferentButtons/OrderButton";

interface Dish {
  id: number;
  name: string;
  description: string;
  recipes: number;
  category: string;
  available: boolean;
  image?: string; // Optional property
}

const ContentItems = () => {
  const [dish, setDish] = useState<Dish[]>([]); // Correctly typed array

  useEffect(() => {
    getDish();
  }, []);

  const getDish = async () => {
    try {
      const res = await api.get<Dish[]>("/api/dish/"); // Ensure TypeScript knows the response type
      setDish(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch dishes");
      console.error(err);
    }
  };

  return (
    <div className="bg-yellow-300">
      <h2>Dish List</h2>
      <div className="bg-slate-50 border-2 border-red-600 gap-4">
        <ul>
          <div className="bg-green-300 gap-y-10 w-full md:flex">
            {dish.length > 0 ? (
              dish.map((item) => (
                <div key={item.id} className="border-4 gap-y-10 w-full md:w-1/2">
                  <li>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Recipes: {item.recipes}</p>
                    <p>Category: {item.category}</p>
                    <p>Available: {item.available ? "Yes" : "No"}</p>
                    {item.image && <img src={item.image} alt={item.name} width="100" />}
                    <CartButton dishId = {item.id}/>
                    <OrderButton dishId = {item.id}/>
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
