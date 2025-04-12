import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

const showSuccess = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: message,
        customClass: {
            container: 'custom-swal-container'
        }
    });
};

const handleError = (error) => {
    const data = error?.response?.data;
    const status = error?.response?.status;

    const title =
        status === 400 ? 'Champ invalide' :
        status === 403 ? 'Permission refusée' :
        status === 404 ? 'Non trouvé' :
        'Erreur';

    const text = data?.message || data?.error || 'Une erreur est survenue';

    Swal.fire({
        icon: 'error',
        title,
        text,
        customClass: {
            container: 'custom-swal-container'
        }
    });

    throw error;
};


export const getAllAdmins = async () => {
    try {
        const response = await axiosInstance.get('');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAdminCount = async () => {
    try {
        const response = await axiosInstance.get('count');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAdminById = async (adminId) => {
    try {
        const response = await axiosInstance.get(`${adminId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createAdmin = async (adminData) => {
    try {
        const response = await axiosInstance.post('create/', adminData);
        showSuccess(response.data.message);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateAdminById = async (adminId, adminData) => {
    try {
        const response = await axiosInstance.put(`update/${adminId}/`, adminData);
        showSuccess(response.data.message);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteAdminById = async (adminId) => {
    try {
        const response = await axiosInstance.delete(`delete/${adminId}/`);
        showSuccess(response.data.message);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


