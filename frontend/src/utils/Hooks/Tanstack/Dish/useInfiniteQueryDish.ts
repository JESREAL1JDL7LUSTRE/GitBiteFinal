import api from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchDishes = async ({ pageParam = "" }: { pageParam?: string }, searchQuery: string) => {
  const url = pageParam || `/api/dish/?search=${searchQuery}`;
  const { data } = await api.get(url);
  return {
    results: data.results,
    nextPage: data.next || null,
  };
};

const useFetchDishes = (searchQuery = "") => {
  return useInfiniteQuery({
    queryKey: ["dishes", searchQuery],
    queryFn: ({ pageParam }) => fetchDishes({ pageParam }, searchQuery),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determines the next page for infinite scrolling
    initialPageParam: "",
  });
};

export default useFetchDishes;
