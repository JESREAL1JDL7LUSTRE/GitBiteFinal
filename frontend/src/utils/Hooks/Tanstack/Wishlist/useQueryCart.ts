import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/api/CartApi";
import { CartItem } from "@/types/Types";

const useQueryCart = () => {
  return useQuery<CartItem[], Error>({
    queryKey: ["cart"],
    queryFn: getCart,
    select: (data) =>
      data.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        dish_data: {
          id: item.dish_data.id,
          name: item.dish_data.name,
          description: item.dish_data.description,
          recipes: item.dish_data.recipes,
          category_name: item.dish_data.category_name,
          available: item.dish_data.available,
          image: item.dish_data.image,
          price: item.dish_data.price,
        },
      })),
  });
};

export default useQueryCart;
