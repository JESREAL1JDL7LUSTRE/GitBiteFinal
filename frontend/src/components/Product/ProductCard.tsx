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

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <Card className="w-full h-auto flex flex-col shadow-md rounded-lg overflow-hidden cursor-pointer">
      <CardHeader className="relative">
        <img
          src={dish.image || "/placeholder.png"}
          alt={dish.name}
          className="object-cover aspect-square w-full rounded-lg"
        />
        <div className="absolute top-3 right-3">
          <button onClick={(e) => e.stopPropagation()}>
            <WishlistButton dishId={dish.id} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-1 flex flex-col gap-1 mx-5 text-start">
        <h1 className="text-s font-bold truncate">{dish.name}</h1>
        <p className="text-gray-500 text-sm">${dish.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 px-2">
        <StarRatingShow rating={averageRating} />
        <button onClick={(e) => e.stopPropagation()}>
          <CartButton dish={dish} />
        </button>
        <button onClick={(e) => e.stopPropagation()}>
          <PaymentButton dishDetails={[dish]} />
        </button>
      </CardFooter>
    </Card>
  );
};


export default ProductCard;
