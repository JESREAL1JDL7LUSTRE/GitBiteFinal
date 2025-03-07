import { useQuery } from "@tanstack/react-query";
import { getDishes } from "@/api/DishApi";

const useQueryDishes = (page: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["dishes", page, searchQuery],
    queryFn: () => getDishes(page, searchQuery),
    staleTime: 5000, // Optional: Keeps data fresh for 5 seconds
    gcTime: 60000, // Optional: Garbage collect after 60 seconds
    placeholderData: (previousData) => previousData, // Keeps previous data for smooth pagination
  });
};

export default useQueryDishes