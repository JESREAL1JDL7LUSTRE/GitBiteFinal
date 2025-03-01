import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchDishes from "../utils/Hooks/FetchHooks/useFetchDishes";
import ProductDetailsCard from "../components/Cards/ProductDetailsCard";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dishes, loading, error, fetchDishes } = useFetchDishes();

    useEffect(() => {
        // Fetch dishes when the component mounts or when `id` changes
        fetchDishes();
    }, [id, fetchDishes]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const dish = dishes.find((d) => d.id === Number(id));

    if (!dish) return <p>Product not found.</p>;

    return (
        <div className="flex justify-center">
            <ProductDetailsCard dish={dish} onBack={() => navigate(-1)} />
        </div>
    );
};

export default ProductDetailPage;
