import useFetchReviews from '@/utils/Hooks/FetchHooks/useFetchReviews';
import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';


function ReviewsForDish({ dishId }: { dishId: number }) {
  const { reviews, loading, error } = useFetchReviews(dishId);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;



  return (
<div className="flex flex-col gap-2">
  <AlertDialog>
    <AlertDialogTrigger>View Reviews</AlertDialogTrigger>
    <AlertDialogDescription/>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Reviews</AlertDialogTitle>
        <div> {/* Changed from <AlertDialogDescription> */}
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review.id}>
                  <p>{review.customer_email}</p>
                  <p>Rating: {review.rating ?? "N/A"}</p>
                  <p>Review: {review.review ?? "N/A"}</p>
                </li>
              ))
            ) : (
              <p>No reviews records found</p>
            )}
          </ul>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Close</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>


  )
}

export default ReviewsForDish