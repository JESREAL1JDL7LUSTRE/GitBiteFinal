
// sample only

import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const ItemPage: React.FC = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get("/api/ratings/1/").then((response) => {
      setRating(response.data.stars);
    });
  }, []);

  const handleRate = async (newRating: number) => {
    setRating(newRating);
    await axios.post("/api/ratings/", { item: 1, stars: newRating }); // Replace `1` with dynamic item ID
  };

  return (
    <div>
      <h2>Rate this Item</h2>
      <StarRating rating={rating} onRate={handleRate} />
    </div>
  );
};

export default ItemPage;
