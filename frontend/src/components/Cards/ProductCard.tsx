import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WishlistButton from "../Buttons/WishlistButton";
import PaymentButton from "../Buttons/PaymentButton";
import CartButton from "../Buttons/CartButton";
import useFetchReviews from '@/utils/Hooks/FetchHooks/useFetchReviews';
import StarRatingShow from "../Reviews/StarRatingShow";

interface ProductCardProps {
  dish: {
    id: number;
    name: string;
    category_name: string;
    price: number;
    image?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ dish }) => {
  const { reviews } = useFetchReviews(dish.id);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
<Card className="group w-full h-full flex flex-col shadow-lg rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white">
      <CardHeader className="relative p-0">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={dish.image || "/placeholder.png"}
            alt={dish.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div 
            className="absolute top-3 right-3 transition-transform hover:scale-110"
            onClick={(e) => e.stopPropagation()} // ✅ Prevents click from propagating
          >
            <WishlistButton dishId={dish.id} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex flex-col text-start">
          <h1 className="font-bold text-lg text-gray-800 line-clamp-1">{dish.name}</h1>
          <p className="font-medium">${dish.price.toFixed(2)}</p>
        </div>
        <div className="flex-row sm:flex items-center gap-3">
          <StarRatingShow rating={averageRating} />
          <span className="text-xs text-gray-500">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex flex-col sm:flex gap-2">
        <div onClick={(e) => e.stopPropagation()} className="w-full sm:flex-col-1">
          <CartButton dish={dish} />
        </div>
        <div onClick={(e) => e.stopPropagation()} className="w-full sm:flex-col-1">
          <PaymentButton dishDetails={[dish]} />
        </div>
      </CardFooter>

    </Card>  );
};

export default ProductCard;