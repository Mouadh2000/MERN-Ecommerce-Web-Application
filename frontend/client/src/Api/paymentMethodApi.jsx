import axiosInstance from '../axiosApi';


export const getAllPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get('payment-methods/');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getPaymentMethodById = async (paymentId) => {
    try {
        const response = await axiosInstance.get(`payment-method/${paymentId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

