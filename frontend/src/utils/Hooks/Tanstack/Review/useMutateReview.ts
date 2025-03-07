import { useMutation } from "@tanstack/react-query";
import { postReview } from "@/api/DishApi";
import { ReviewData } from "@/types/Types";

const usePostReview = () => {
  return useMutation<void, Error, ReviewData>({
    mutationFn: postReview, // Calls API function
    retry: 2, // Retry twice on failure
  });
};

export default usePostReview;
