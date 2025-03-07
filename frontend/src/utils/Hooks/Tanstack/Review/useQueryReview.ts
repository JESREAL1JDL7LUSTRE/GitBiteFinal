import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/api/DishApi";
import { ReviewsItem } from "@/types/Types";

const useFetchReviews = (dish_id: number | null) => {
  return useQuery<ReviewsItem[], Error>({
    queryKey: ["reviews", dish_id], // Unique cache key
    queryFn: () => getReviews(dish_id!), // Fetch function
    enabled: !!dish_id, // Only fetch if dish_id is valid
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry on failure
  });
};

export default useFetchReviews;
