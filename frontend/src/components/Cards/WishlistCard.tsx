import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import PaymentButton from "../Buttons/PaymentButton";
import useFetchReviews from '@/utils/Hooks/FetchHooks/useFetchReviews';
import StarRatingShow from "../Reviews/StarRatingShow";
import CartDelButton from "../Buttons/DeleteButtons/CartDelButton";

interface WishlistCardProps {
  dish: {
    id: number;
    name: string;
    category_name: string;
    price: number;
    image?: string;
    description?: string;
    available?: boolean;
  };
  cartId: number;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ dish, cartId }) => {
  const { reviews } = useFetchReviews(dish.id);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group w-full h-full flex flex-col shadow-lg rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white">
        <CardHeader className="relative p-0">
          <div className="relative overflow-hidden aspect-square">
            <motion.img
              src={dish.image || "/placeholder.png"}
              alt={dish.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100"
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={(e) => e.stopPropagation()} className="transition-transform hover:scale-110">
                <CartDelButton cartId={cartId} />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex flex-col text-start">
            <h1 className="font-bold text-lg text-gray-800 line-clamp-1">{dish.name}</h1>
            <p className="text-sm text-gray-500">
              Available: {dish.available ? "Yes" : "No"}
            </p>
            <p className="font-medium text-lg">${dish.price.toFixed(2)}</p>
          </div>
          <div className="flex-row sm:flex items-center gap-3">
            <StarRatingShow rating={averageRating} />
            <span className="text-xs text-gray-500">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto flex flex-col sm:flex-row gap-2">
          <button onClick={(e) => e.stopPropagation()} className="w-full sm:flex-1">
            <PaymentButton dishDetails={[{ id: dish.id, name: dish.name, price: dish.price, quantity: 1 }]} />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WishlistCard;
