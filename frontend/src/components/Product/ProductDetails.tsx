import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
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
    category_name: string;
    price: number;
    image?: string;
    recipes?: string;
  };
  onBack: () => void;
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ dish, onBack }) => {
  const { reviews } = useFetchReviews(dish.id);
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

    return (
      <div className=" w-full max-w-4xl mx-auto p-6 md:p-8">
        <button onClick={onBack} className="text-blue-500 mb-4 flex">
          ← Back to Products
        </button>
    
        <Card className="w-full max-w-xxl grid grid-cols-1 md:grid-cols-2 gap-8 items-start shadow-lg p-6">
          <div className="relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="object-cover w-full aspect-square rounded-lg shadow-md"
            />
            {/* Wishlist Button */}
            <div className="absolute top-3 right-3">
              <WishlistButton dishId={dish.id} />
            </div>
          </div>
    
          <div className="flex flex-col justify-between space-y-4">
            {/* Header */}
            <CardHeader className="p-0 space-y-2">
              <h1 className="text-xl font-bold text-start">{dish.name}</h1>
              <span className="bg-green-200 text-green-800 px-3 py-1 text-xs font-medium rounded-md w-max">
                # {dish.category_name}
              </span>
              <p className="text-2xl font-bold text-start">${dish.price}</p>
              <p className="text-gray-500 text-start">{dish.description}</p>
            </CardHeader>
    
            {/* Variation & Quantity */}
            <CardContent className="">

            </CardContent>
    
            <CardFooter className="flex flex-col gap-3 p-0">
              <PlanToOrderButton dish={dish} />
              <PaymentButton dishDetails={[dish]} />
            </CardFooter>
          </div>
        </Card>
        
        <Card className="mt-8">
          <CardHeader className="text-lg font-bold">Recipe</CardHeader>
          <CardContent>
            <p className="text-sm">{dish.recipes}</p>
          </CardContent>
        </Card>

        <div className="mt-10 text-start font-bold text-lg">Latest Reviews</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} className="p-4 shadow-lg border rounded-lg">
                  <div className="text-start font-semibold"><StarRatingShow rating={review.rating} /></div>
                  <div className="flex items-center mt-2 text-start">Review: {review.review ?? "N/A"}
                  </div>
                  <p className="text-start mt-2 text-gray-700">
                    <span className="font-medium"></span>  {review.customer_email}
                  </p>
                </Card>
              ))
            ) : (
              <Card className="p-4 shadow-lg border rounded-lg">
                <p className="text-center text-gray-500">No reviews found</p>
              </Card>
            )}
          </div>
        
      </div>
    );
  }    
export default ProductDetails;
