import axiosInstance from "../axiosApi";
export const getAllCategory = async () => {
    try {
        const response = await axiosInstance.get('categories/');
        return response.data;
    } catch (error) {
        return false;
    }
};