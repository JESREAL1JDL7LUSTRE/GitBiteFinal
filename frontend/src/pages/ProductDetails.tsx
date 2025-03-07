import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailsCard from "../components/Cards/ProductDetailsCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import useFetchDishes from "@/utils/Hooks/Tanstack/Dish/useInfiniteQueryDish";



const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: dishes, isLoading:loading, error } = useFetchDishes();

useEffect(() => {
    // Scroll to top when the component mounts or when `id` changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
}, [id]);
    

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-screen"
            >
                <Loader2 className="h-12 w-12 animate-spin text-[#a0c878]" />
                <p className="ml-2 text-[#a0c878] font-medium">Loading product details...</p>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-screen"
            >
                <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
                    <p className="text-red-600 font-medium">{error.message}</p>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mt-4 px-4 py-2 bg-[#a0c878] hover:bg-[#8fb86a] text-white rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </motion.div>
        );
    }

    const dish = dishes?.pages.flatMap(page => page.results).find((d) => d.id === Number(id));

    if (!dish) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-screen"
            >
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-gray-800 font-medium text-lg">Product not found.</p>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mt-4 px-4 py-2 bg-[#a0c878] hover:bg-[#8fb86a] text-white rounded-md"
                    >
                        Go Back to Products
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]"
        >
            <ProductDetailsCard dish={{ ...dish, category_name: [dish.category_name] }} onBack={() => navigate(-1)} />
        </motion.div>
    );
};

export default ProductDetailPage;
