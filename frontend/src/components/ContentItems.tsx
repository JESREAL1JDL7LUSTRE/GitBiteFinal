import { useEffect, useState } from "react";
import api from "../api/api";

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
    <div>
      <h2>Dish List</h2>
      <ul>
        {dish.length > 0 ? (
          dish.map((item) => (
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
          <p>No dishes available</p>
        )}
      </ul>
    </div>
  );
};

export default ContentItems;
