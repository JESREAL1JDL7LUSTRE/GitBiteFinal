import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WishlistButton from '../Buttons/WishlistButton';
import PaymentButton from '../Buttons/PaymentButton';
import CartButton from '../Buttons/CartButton';

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
  return (
    <Card className="w-64 h-auto flex flex-col shadow-md rounded-lg overflow-hidden">
      <CardHeader className="relative">
        <img 
          src={dish.image || "/placeholder.png"} 
          alt={dish.name} 
          className="object-cover aspect-square w-full rounded-lg"
        />

        <div className="absolute top-3 right-3">
          <WishlistButton dishId={dish.id} />
        </div>
      </CardHeader>

      <CardContent className="p-1">
        <h1 className="text-s font-bold">{dish.name}</h1>
        <p className="text-gray-500 text-sm">${dish.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4">
        <CartButton dish={dish} />
        <PaymentButton order={{ id: dish.id, total_price: dish.price }} dishDetails={[dish]} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
