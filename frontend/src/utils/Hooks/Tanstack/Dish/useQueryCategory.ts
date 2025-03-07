import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/DishApi";
import { CategoryItem } from "@/types/Types";

const useFetchCategory = () => {
  return useQuery<CategoryItem[], Error>({
    queryKey: ["categories"], // Unique query key for caching
    queryFn: getCategories, // Fetch function
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
  });
};

export default useFetchCategory;
