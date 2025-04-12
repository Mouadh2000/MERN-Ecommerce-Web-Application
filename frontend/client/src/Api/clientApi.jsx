import axiosInstance from "../axiosApi";

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/signup', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
};