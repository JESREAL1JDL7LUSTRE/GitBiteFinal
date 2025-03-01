import React, { useState } from "react";
import StarRating from "../Reviews/StarRating";
import usePostReview from "../../utils/Hooks/PostHooks/usePostReviews"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Star } from "lucide-react";

interface AddReviewProps {
  dishId: number; // Pass dishId when using this component
}

const AddReview: React.FC<AddReviewProps> = ({ dishId }) => {
  const { postReview, loading, error } = usePostReview();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRate = (rating: number) => setRating(rating);
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value);

  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      alert("Please provide a rating and review text.");
      return;
    }

    await postReview({
      dish: dishId, // Ensure correct dish ID is passed
      rating,
      review: reviewText,
    });

    setReviewText(""); // Reset input fields after submission
    setRating(0);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center text-amber-500 hover:text-amber-600 transition-colors"><Star className="w-4 h-4 mr-1" /> <span className="text-sm">Add Review</span>
        </AlertDialogTrigger>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rate this Dish</AlertDialogTitle>
            <StarRating rating={rating} onRate={handleRate} />
            <AlertDialogDescription>
              <textarea
                placeholder="Write your review here..."
                className="w-full p-2 border rounded-lg"
                value={reviewText}
                onChange={handleReviewChange}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {error && <p className="text-red-500">{error}</p>}
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddReview;
