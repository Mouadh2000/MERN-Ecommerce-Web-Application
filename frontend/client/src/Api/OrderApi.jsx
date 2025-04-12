import axiosInstance from "../axiosApi";


export const getClientOrderById = async (clientId) => {
    try {
        const response = await axiosInstance.get(`orders/${clientId}`);
        return response.data;
    } catch (error) {
        return false;
    }
};

export const createClientOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("order", orderData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error creating order",
      error: error.message,
    };
  }
};
