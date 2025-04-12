import axiosInstance from "axiosApi";

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get('orders');
        return response.data;
    } catch (error) {
        return false;
    }
};


export const getTotalAmount = async () => {
    try {
        const response = await axiosInstance.get('orders/total-amount');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getTotalSales = async () => {
    try {
        const response = await axiosInstance.get('orders/total-sales');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getMonthlyOrderTotals = async () => {
    try {
        const response = await axiosInstance.get('orders/by-month');
        return response.data;
    } catch (error) {
        return false;
    }
};