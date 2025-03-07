import api from "./api";

export const getCart = async () => {
    try {
        const res = await api.get('/api/cart/');
        return res.data;
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error; // Fixed error throwing
    }
};

export const addToCartApi = async (dishId: number, quantity: number = 1) => {
    try {
        const res = await api.post("/api/cart/", { dish: dishId, quantity });
        return res.data;
    } catch (error) {
        console.error("❌ Error adding to cart:", error);
        throw error;
    }
};

export const updateCartItemApi = async (dishId: number, quantityChange: number) => {
    try {
        const res = await api.put(`/api/cart/${dishId}/`, { quantityChange });
        return res.data;
    } catch (error) {
        console.error("❌ Error updating cart:", error);
        throw error;
    }
};

export const deleteCartApi = async (cartId: number) => {
    try {
        const res = await api.delete(`/api/cart/${cartId}/`);
        return res.data;
    } catch (error) {
        console.error("❌ Error deleting cart:", error);
        throw error;
    }
};
