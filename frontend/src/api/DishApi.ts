import api from "./api";
import { CategoryItem, Dish, ReviewData, ReviewsItem } from "@/types/Types";

export const getCategories = async () => {
    try {
        const res = await api.get<CategoryItem[]>("/api/category/");
        return res.data;
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
};

export const getDishes = async (page: number, searchQuery: string) => {
    try {
        const res = await api.get<{ results: Dish[]; count: number }>("/api/dish/", {
            params: {
                page,
                search: searchQuery || "",
            },
        });
        return {
            dishes: res.data.results,
            totalPages: Math.ceil(res.data.count / 10), // Assuming page_size=10
        };
    } catch (error) {
        console.error("❌ Error fetching dishes:", error);
        throw error;
    }
};

/**
 * Fetches reviews for a specific dish.
 * @param dish_id - The ID of the dish.
 * @returns A list of reviews.
 */
export const getReviews = async (dish_id: number): Promise<ReviewsItem[]> => {
  try {
    const res = await api.get<ReviewsItem[]>(`/api/reviews/dish/${dish_id}/`);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch reviews:", error);
    throw error;
  }
};

/**
 * Submits a review for a dish.
 * @param reviewData - The review data containing dish ID, rating, and review text.
 */
export const postReview = async (reviewData: ReviewData): Promise<void> => {
  try {
    await api.post("/api/reviews/", reviewData);
  } catch (error) {
    console.error("❌ Failed to submit review:", error);
    throw error;
  }
};

