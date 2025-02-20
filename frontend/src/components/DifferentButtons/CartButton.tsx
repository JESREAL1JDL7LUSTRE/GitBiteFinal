import axios from "axios";
import api from "../../api/api";
import { useNavigate } from 'react-router-dom'

function CartButton({ dishId }: { dishId: number }) { 
    
    const nav = useNavigate()

    const addToCart = async () => {  // 🔹 No need to pass dishId, it's already in scope
        try {
            await api.post("/api/cart/", { 
                dish: dishId, 
                quantity: 1 
            });
                
        } catch (error: unknown) { 
            if (axios.isAxiosError(error)) {
                console.error("Failed to add to cart:", error.response?.data || error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
            alert("Error adding item to cart. Please try log in.");
            nav("/signin")
        }
    };

    return (
        <button onClick={addToCart}>Add to cart</button>
    );
}

export default CartButton;
