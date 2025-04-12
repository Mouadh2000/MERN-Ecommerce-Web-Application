import axiosInstance from "../axiosApi";
export const getProductsByCategory = async (category) => {
    try {
        const response = await axiosInstance.get(`products/category/${category}`);
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getProductsById = async (productId) => {
    try {
        const response = await axiosInstance.get(`product/${productId}`);
        return response.data;
    } catch (error) {
        return false;
    }
};
export const checkProductStock = async (productId) => {
    try {
        const response = await axiosInstance.get(`product/stock/${productId}`);
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getAllProduct = async () => {
    try {
        const response = await axiosInstance.get('products/');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getTopRatedProducts = async () => {
    try {
        const response = await axiosInstance.get('products/top-rated');
        return response.data;
    } catch (error) {
        return false;
    }
};