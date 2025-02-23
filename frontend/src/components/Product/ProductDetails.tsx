import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import logo from "../../assets/logo.png";

const ProductDetails = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
      {/* Image Section */}
      <div className="relative">
        <img
          src={logo}
          alt="Product Image"
          className="object-cover w-full aspect-square rounded-lg shadow-md"
        />
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
          <Heart className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Details Section */}
      <div className="flex flex-col space-y-4">
        <CardHeader className="p-0 space-y-2">
          <h1 className="text-xl font-bold flex ">Dish Name</h1>
          <span className="bg-green-200 text-green-800 px-3 py-1 text-xs font-medium rounded-md w-max">
            Tag
          </span>
          <p className="text-3xl font-bold mt-1 flex">₱50</p>
          <p className="text-gray-500 flex">Text</p>
        </CardHeader>

        {/* Variation & Quantity */}
        <CardContent className="space-y-4 p-0">
          <div className="flex flex-row gap-4 justify-between">
            <div className=" space-y-2">
                <label className="flex text-sm font-medium block">Variation</label>
                <select className="w-full border rounded-md px-2 py-1">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                </select>
            </div>

            <div className="space-y-">
                <label className="flex text-sm font-medium block">Quantity</label>
                <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline">
                    <Minus className="w-2 h-2" />
                </Button>
                <span className="text-lg font-semibold">1</span>
                <Button size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                </Button>
                </div>
            </div>
          </div>  
        </CardContent>

        {/* Buttons */}
        <CardFooter className="flex flex-col gap-3 p-0">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3">
            Add to cart
          </Button>
          <Button className="w-full bg-black hover:bg-gray-800 text-white text-lg font-medium py-3">
            Buy Now
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductDetails;
