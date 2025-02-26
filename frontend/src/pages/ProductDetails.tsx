import { useParams, useNavigate } from "react-router-dom";
import useFetchDishes from "../utils/Hooks/FetchHooks/useFetchDishes"; // ✅ Corrected import
import ProductDetailsCard from "../components/Product/ProductDetailsCard";

const ProductDetailPage = () => {
    const { id } = useParams(); // ✅ Get product ID from URL
    const navigate = useNavigate(); // ✅ For back navigation
    const { dishes, loading, error } = useFetchDishes(); // ✅ Fetch all dishes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // ✅ Convert `id` to number and find the dish
    const dish = dishes.find((d) => d.id === Number(id));

    if (!dish) return <p>Product not found.</p>;

    return (
    <div className="flex justify-center">
        <ProductDetailsCard dish={dish} onBack={() => navigate(-1)} />
    </div>
    );
}

export default ProductDetailPage;
