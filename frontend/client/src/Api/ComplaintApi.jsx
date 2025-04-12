import axiosInstance from "../axiosApi";

export const createComplaint = async (complaintData) => {
  try {
    const response = await axiosInstance.post("complaint", complaintData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error creating complaint",
      error: error.message,
    };
  }
};
