import { motion } from "framer-motion";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import WishlistButton from "../Buttons/WishlistButton";
import PaymentButton from "../Buttons/PaymentButton";
import PlanToOrderButton from "../Buttons/CartButton";
import useFetchReviews from "@/utils/Hooks/FetchHooks/useFetchReviews";
import StarRatingShow from "../Reviews/StarRatingShow";

interface ProductDetailsProps {
  dish: {
    id: number;
    name: string;
    description: string;
    category_name: string[];
    price: number;
    image?: string;
    recipes?: string;
  };
  onBack: () => void;
}

const ProductDetailsCard: React.FC<ProductDetailsProps> = ({ dish, onBack }) => {
  const { reviews = [] } = useFetchReviews(dish?.id || 0);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-6 md:p-8"
    >
      <button onClick={onBack} className="text-blue-500 mb-4 flex">
        ← Back to Products
      </button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-xxl grid grid-cols-1 md:grid-cols-2 gap-8 items-start shadow-lg p-6">
          <div className="relative">
            <img
              src={dish.image || "/placeholder-image.jpg"}
              alt={dish.name}
              className="object-cover w-full aspect-square rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <CardHeader className="p-0 space-y-2">
              <StarRatingShow rating={averageRating} />
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold py-2 text-start">{dish.name}</h1>
                <div>
                  <WishlistButton dishId={dish.id} />
                </div>
              </div>

              <div className="flex gap-2">
                {dish.category_name?.map((category, index) => (
                  <span
                    key={index}
                    className="bg-green-200 text-green-800 px-3 py-1 text-xs font-medium rounded-md"
                  >
                    {category}
                  </span>
                )) || (
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 text-xs font-medium rounded-md">
                    Uncategorized
                  </span>
                )}
              </div>

              <p className="text-2xl font-bold text-start">${dish.price.toFixed(2)}</p>
              <p className="text-gray-500 text-start">
                {dish.description || "No description available."}
              </p>
            </CardHeader>

            <CardContent className=""></CardContent>

            <CardFooter className="flex flex-col gap-3 p-0">
              <PlanToOrderButton dish={{ ...dish, image: dish.image || "/placeholder.png" }} />
              <PaymentButton dishDetails={[{ id: dish.id, name: dish.name, price: dish.price, quantity: 1 }]} />
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="mt-8">
          <CardHeader className="text-lg font-bold">Recipe</CardHeader>
          <CardContent>
            <p className="text-sm">{dish.recipes || "No recipe details available."}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-10 text-start font-bold text-lg">Latest Reviews</div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-4 shadow-lg border rounded-lg">
              <div className="text-start">
                <div className="font-semibold">
                  <StarRatingShow rating={review.rating} />
                </div>
                <div className="flex items-start mt-2 font-semibold">
                  Review: {review.review ?? "N/A"}
                </div>
                <p className="text-start mt-2 text-gray-700">{review.customer_email}</p>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-4 shadow-lg border rounded-lg">
            <p className="text-center text-gray-500">No reviews found</p>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailsCard;
